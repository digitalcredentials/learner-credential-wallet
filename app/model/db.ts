import Realm from 'realm';
import * as SecureStore from 'expo-secure-store';
import * as RNFS from 'react-native-fs';
import * as encoding from 'text-encoding';
import { generateSecureRandom } from 'react-native-securerandom';
import { NativeModules } from 'react-native';

import { CredentialSchema } from './schema/credential';

const Aes = NativeModules.Aes;

const PRIVILEGED_KEY_KID: string = 'privileged_key';
const PRIVILEGED_KEY_STATUS_ID: string = 'privileged_key_status';
const UNLOCKED: string = 'locked';
const LOCKED: string = 'unlocked';

const PBKDF2_ITERATIONS: number = 10000;
const PBKDF2_SALT_PATH: string = `${RNFS.DocumentDirectoryPath}/edu-wallet-salt`;

export default class DatabaseAccess {
  public static async withInstance(callback: (instance: Realm) => void | Promise<void>): Promise<void> {
    const database = await DatabaseAccess.instance();

    try {
      await callback(database);
    } catch (err) {
      database.close();

      throw err;
    } finally {
      database.close();
    }
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
      await DatabaseAccess.withInstance((_) => {});
    } catch (err) {
      console.error(err);
      await DatabaseAccess.lock();
    }
  }

  public static async lock(): Promise<void> {
    if (!(await this.isUnlocked())) return;

    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, LOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, ''),
    ]);
  }

  private static async salt(): Promise<string> {
    return RNFS.readFile(PBKDF2_SALT_PATH, 'utf8');
  }

  public static async isInitialized(): Promise<boolean> {
    return RNFS.exists(Realm.defaultPath);
  }

  /**
   * WARNING: Calling this function is destructive. It will wipe out the
   * existing salt and database. There should also be no active connections
   * to the database when you call this method.
   */
  public static async initialize(passphrase: string): Promise<void> {
    if (await DatabaseAccess.isUnlocked()) {
      throw new Error('Cannot initialize unlocked wallet.');
    }

    const decoder = new encoding.TextDecoder();
    const rawSalt = await generateSecureRandom(64);
    const salt: string = decoder.decode(rawSalt);

    if (await DatabaseAccess.isInitialized()) {
      /**
       * Realm does not provide a way to initialize a database, so we just
       * delete all of the files it creates.
       */
      await Promise.all([
        RNFS.unlink(`${Realm.defaultPath}.lock`),
        RNFS.unlink(`${Realm.defaultPath}.note`),
        RNFS.unlink(`${Realm.defaultPath}.management`),
        RNFS.unlink(Realm.defaultPath),
      ]);
    }

    await RNFS.writeFile(PBKDF2_SALT_PATH, salt, 'utf8');

    // The first call to unlock will create/encrypt the Realm with the pass
    await DatabaseAccess.unlock(passphrase);
    await DatabaseAccess.lock();
  }

  private static async instance(): Promise<Realm> {
    if (!(await this.isUnlocked())) {
      throw new Error('Wallet is not unlocked.');
    }

    const key = await SecureStore.getItemAsync(PRIVILEGED_KEY_KID);

    if (key === null) {
      throw new Error('Key not present in keychain.');
    }

    const encoder = new encoding.TextEncoder();
    const encryptionKey: Int8Array = new Int8Array(encoder.encode(key));

    const realm = await Realm.open({
      schema: [CredentialSchema],
      encryptionKey,
    });

    return realm;
  }
}
