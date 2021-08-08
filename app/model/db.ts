import Realm from 'realm';
import * as SecureStore from 'expo-secure-store';
import { CredentialSchema } from './schema/credential';
import { NativeModules } from 'react-native';

const Aes = NativeModules.Aes;

const PRIVILEGED_KEY_KID: string = 'privileged_key';
const PRIVILEGED_KEY_STATUS_ID: string = 'privileged_key_status';
const UNLOCKED: string = 'locked';
const LOCKED: string = 'unlocked';

/** This salt was derived randomly once, but we should probably generate a novel
 * one each time the wallet is initialized. TODO: Find out a safe place to persist
 * the salt.
 */
const PBKDF2_ITERATIONS: number = 10000;
const PBKDF2_SALT: string = '�+x�\f\t���#�[�\fo0��E�Ö&\u0011\u0017��#:m\u001bdnc<���\u0015I�V��ʕ\u000b�rj����\u0007X�<�\u0007�\u0019_';

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

  public static get isUnlocked(): Promise<boolean> {
    return SecureStore
      .getItemAsync(PRIVILEGED_KEY_STATUS_ID)
      .then(keyStatus => keyStatus === UNLOCKED)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  /**
   * This generates the key to unlock the wallet and stores it
   * in SecureStorage. Please adhere to these guidelines:
   *   1. Never store/persist the passphrase. It should only exist in input an
   *      the variable passed to this function.
   *   2. Never store the key generated in any place but SecureStorage
   */
  public static async unlock(passphrase: string): Promise<void> {
    if (await this.isUnlocked) return;

    const key = await Aes.pbkdf2(passphrase, PBKDF2_SALT, PBKDF2_ITERATIONS, 256);

    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, UNLOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, key),
    ]);

    // Attempt database decryption to see if key is valid
    try {
      await DatabaseAccess.instance();
    } catch (err) {
      await DatabaseAccess.lock();
    }
  }

  public static async lock(): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, LOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, ''),
    ]);
  }

  private static async instance(): Promise<Realm> {
    if (!(await this.isUnlocked)) {
      throw new Error('Wallet is not unlocked.');
    }

    const key = await SecureStore.getItemAsync(PRIVILEGED_KEY_KID);

    if (key === null) {
      throw new Error('Key not present in keychain.');
    }

    const encoder = new TextEncoder();
    const encryptionKey: Int8Array = new Int8Array(encoder.encode(key));

    const realm = await Realm.open({
      path: 'edu-wallet-encrypted',
      schema: [CredentialSchema],
      encryptionKey,
    });

    return realm;
  }
}
