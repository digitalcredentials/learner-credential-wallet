import Realm from 'realm';
import * as SecureStore from 'expo-secure-store';
import * as RNFS from 'react-native-fs';
import * as encoding from 'text-encoding';
import { generateSecureRandom } from 'react-native-securerandom';
import { NativeModules } from 'react-native';

import { CredentialRecord } from './credential';
import { DidRecord } from './did';
import { parseWalletContents } from '../lib/parseWallet';

import type { UnlockedWallet, WalletImportResponse } from '../types/wallet';

export * from './credential';
export * from './did';

const models: Realm.ObjectClass[] = [
  CredentialRecord,
  DidRecord,
];

const Aes = NativeModules.Aes;

const PRIVILEGED_KEY_KID = 'privileged_key';
const PRIVILEGED_KEY_STATUS_ID = 'privileged_key_status';
const UNLOCKED = 'locked';
const LOCKED = 'unlocked';

const PBKDF2_ITERATIONS = 10000;
const PBKDF2_SALT_PATH = `${RNFS.DocumentDirectoryPath}/edu-wallet-salt`;

class DatabaseAccess {
  /**
   * Do not store off the instance from withInstance for any reason. If you need
   * to do work on the database, do all of it within the callback to withInstance.
   */
  public static async withInstance<T>(callback: (instance: Realm) => T | Promise<T>): Promise<T> {
    const database = await DatabaseAccess.instance();

    return callback(database);
  }

  public static async isUnlocked(): Promise<boolean> {
    try {
      const keyStatus = await SecureStore.getItemAsync(PRIVILEGED_KEY_STATUS_ID);

      return keyStatus === UNLOCKED;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  /**
   * This generates the key to unlock the wallet and stores it
   * in SecureStorage. Please adhere to these guidelines:
   *   1. Never store/persist the passphrase. It should only exist in input an
   *      the variable passed to this function.
   *   2. Never store the key generated in any place but SecureStorage
   */
  public static async unlock(passphrase: string): Promise<void> {
    if (await this.isUnlocked()) return;

    const key = await Aes.pbkdf2(
      passphrase,
      await DatabaseAccess.salt(),
      PBKDF2_ITERATIONS,
      256,
    );

    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, UNLOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, key),
    ]);

    // Attempt database decryption to see if key is valid
    try {
      await DatabaseAccess.instance();
    } catch (err) {
      await DatabaseAccess.lock();

      throw err;
    }
  }

  public static async lock(): Promise<void> {
    if (!(await this.isUnlocked())) return;

    if (DatabaseAccess.realm !== null) {
      DatabaseAccess.realm = null;
    }

    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, LOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, ''),
    ]);
  }

  public static async isInitialized(): Promise<boolean> {
    /**
     * We can't use `Realm.exists` here because the config is
     * only available for the unlocked state.
     */
    return RNFS.exists(Realm.defaultPath);
  }

  /**
   * WARNING: Calling these two functions are destructive. They will wipe out the
   * existing salt and database.
   */
  public static async reset(): Promise<void> {
    if (await DatabaseAccess.isUnlocked()) {
      throw new Error('Cannot reset unlocked wallet.');
    }

    await Promise.all([
      RNFS.unlink(`${Realm.defaultPath}.lock`),
      RNFS.unlink(`${Realm.defaultPath}.note`),
      RNFS.unlink(`${Realm.defaultPath}.management`),
      RNFS.unlink(Realm.defaultPath),
    ]);
  }

  public static async initialize(passphrase: string): Promise<void> {
    if (await DatabaseAccess.isUnlocked()) {
      throw new Error('Cannot initialize unlocked wallet.');
    }

    if (await DatabaseAccess.isInitialized()) {
      throw new Error('Wallet must be in reset state to be initialized');
    }

    const decoder = new encoding.TextDecoder();
    const rawSalt = await generateSecureRandom(64);
    const salt: string = decoder.decode(rawSalt);

    await RNFS.writeFile(PBKDF2_SALT_PATH, salt, 'utf8');

    // The first call to unlock will create/encrypt the Realm with the pass
    await DatabaseAccess.unlock(passphrase);
    await DatabaseAccess.lock();
  }

  public static async export(): Promise<UnlockedWallet> {
    if (!(await this.isUnlocked())) {
      throw new Error('Cannot export a locked wallet.');
    }

    const credentialRecords = await CredentialRecord.getAllCredentials();
    const credentials = credentialRecords.map(({ credential }) => credential);

    const didRecords = await DidRecord.getAllDidRecords();
    const { didDocument, verificationKey, keyAgreementKey } = didRecords[0];

    /**
     * The Unlocked Wallet spec requires all wallet content
     * types to be combined into a flat array.
     * https://w3c-ccg.github.io/universal-wallet-interop-spec/#unlocked-wallet
     */
    const contents = [
      ...credentials,
      didDocument,
      verificationKey,
      keyAgreementKey,
    ];

    const wallet: UnlockedWallet = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/wallet/v1',
      ],
      id: 'http://example.gov/wallet/3732',
      type: 'UniversalWallet2020',
      status: 'UNLOCKED',
      contents,
    };

    return wallet;
  }

  public static async import(rawWallet: string): Promise<WalletImportResponse> {
    if (!(await this.isUnlocked())) {
      throw new Error('Cannot import into a locked wallet.');
    }

    const {
      credentials,
      didDocument,
      verificationKey,
      keyAgreementKey,
    } = parseWalletContents(rawWallet);

    const response: WalletImportResponse = {
      success: [],
      duplicate: [],
      failed: [],
    };

    const existingCredentials = await CredentialRecord.getAllCredentials();
    const existingCredentialIds = existingCredentials.map(({ credential }) => credential.id);

    await Promise.all(credentials.map(async (credential) => {
      /*
       * TODO - this is the same field used for the title use in other places when displaying
       * a credential. Should that also be used here?
       */
      let achievement = credential.credentialSubject.hasCredential ??
        credential.credentialSubject.achievement;
      if (Array.isArray(achievement)) {
        achievement = achievement[0];
      }
      const credentialName = achievement?.name ?? 'Unknown Credential';
      if (existingCredentialIds.includes(credential.id)) {
        response.duplicate.push(credentialName);
        return;
      }

      try {
        await CredentialRecord.addCredential(CredentialRecord.rawFrom(credential));
        response.success.push(credentialName);
      } catch(err) {
        console.warn(`Unable to import credential: ${err}`);
        response.failed.push(credentialName);
      }
    }));

    const existingDidRecords = await DidRecord.getAllDidRecords();

    // Replace the DID Document if one already exisits.
    if (existingDidRecords.length !== 0) {
      const [didRecord] = existingDidRecords;
      await DidRecord.deleteDidRecord(didRecord);
    }
    await DidRecord.addDidRecord(didDocument, verificationKey, keyAgreementKey);

    return response;
  }

  private static async encryptionKey(): Promise<Int8Array> {
    if (!(await this.isUnlocked())) {
      throw new Error('Wallet is not unlocked.');
    }

    const key = await SecureStore.getItemAsync(PRIVILEGED_KEY_KID);

    if (key === null) {
      throw new Error('Key not present in keychain.');
    }

    const encoder = new encoding.TextEncoder();
    return new Int8Array(encoder.encode(key));
  }

  private static async salt(): Promise<string> {
    return RNFS.readFile(PBKDF2_SALT_PATH, 'utf8');
  }

  private static async config(): Promise<Realm.Configuration> {
    return {
      schema: models,
      encryptionKey: await DatabaseAccess.encryptionKey(),
    };
  }

  private static realm: Realm | null = null;
  private static async instance(): Promise<Realm> {
    if (DatabaseAccess.realm !== null) {
      return DatabaseAccess.realm;
    } else {
      return DatabaseAccess.realm = await Realm.open(await DatabaseAccess.config());
    }
  }
}

export {
  models,
  DatabaseAccess as db,
};
