import Realm from 'realm';
import { CredentialSchema } from './schema/credential';

import KeyStore from './keystore';

export default class DatabaseAccess {
  private static async instance(): Promise<Realm> {
    return KeyStore.withKey<Realm>(async (key) => {
      const encoder = new TextEncoder();
      const encryptionKey: Int8Array = new Int8Array(encoder.encode(key));

      const realm = await Realm.open({
        path: 'edu-wallet-encrypted',
        schema: [CredentialSchema],
        encryptionKey,
      });

      return realm;
    });
  }

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
}
