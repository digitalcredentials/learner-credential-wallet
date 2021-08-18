import Realm from 'realm';
import * as SecureStore from 'expo-secure-store';
import * as RNFS from 'react-native-fs';
import * as encoding from 'text-encoding';
import { generateSecureRandom } from 'react-native-securerandom';
import { NativeModules } from 'react-native';

import { CredentialRecord } from './credential';

const models: Realm.ObjectClass[] = [
  CredentialRecord,
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
      const instance = await DatabaseAccess.instance();
      instance.close();
    } catch (err) {
      await DatabaseAccess.lock();

      throw err;
    }
  }

  public static async lock(): Promise<void> {
    if (!(await this.isUnlocked())) return;

    if (DatabaseAccess.realm !== null) {
      DatabaseAccess.realm.close();
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
    if (!(await DatabaseAccess.isUnlocked())) {
      throw new Error('Cannot reset locked wallet.');
    }

    Realm.deleteFile(await DatabaseAccess.config());

    await DatabaseAccess.lock();
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
  CredentialRecord,
};
