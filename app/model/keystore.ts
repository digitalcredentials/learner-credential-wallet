import * as SecureStore from 'expo-secure-store';
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

export default class KeyStore {
  public static get isUnlocked(): Promise<boolean> {
    return SecureStore
      .getItemAsync(PRIVILEGED_KEY_STATUS_ID)
      .then(keyStatus => keyStatus === UNLOCKED)
      .catch(err => {
        console.error(err);
        return false;
      });
  }

  public static async lock(): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(PRIVILEGED_KEY_STATUS_ID, LOCKED),
      SecureStore.setItemAsync(PRIVILEGED_KEY_KID, ''),
    ]);
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
  }

  public static async withKey<T>(callback: (key: string) => T | Promise<T>): Promise<T> {
    if (!(await this.isUnlocked)) {
      throw new Error('Wallet is not unlocked.');
    }

    const key = await SecureStore.getItemAsync(PRIVILEGED_KEY_KID);

    if (key === null) {
      throw new Error('Key not present in keychain.');
    }

    return callback(key);
  }
}
