import { ObjectID } from 'bson';

import { db, CredentialRecord } from '../';
import type { Credential } from '../../types/credential';

export type CredentialObject = {
  objectId: string;
  credential: Credential;
}

export default class CredentialDAO {
  static async addCredential(credential: Credential): Promise<void> { 
    await db.withInstance((instance) => {
      instance.write(() => {
        instance.create(CredentialRecord.name, CredentialRecord.fromRaw(credential));
      });
    });
  }

  static getAllCredentials(): Promise<CredentialObject[]> {
    return db.withInstance((instance) => {
      const results = instance.objects<CredentialRecord>(CredentialRecord.name);

      if (results.length) {
        return results.map((record) => ({
          objectId: record._id.toHexString(),
          credential: record.credential,
        }));
      }

      return [];
    });
  }

  static async deleteCredential(credentialObject: CredentialObject): Promise<void> {
    await db.withInstance((instance) => {
      const objectId = new ObjectID(credentialObject.objectId);
      const credentialRecord = instance.objectForPrimaryKey(CredentialRecord.name, objectId);

      instance.write(() => {
        instance.delete(credentialRecord);
      });
    });
  }
}