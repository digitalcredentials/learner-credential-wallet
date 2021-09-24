import Realm from 'realm';
import { ObjectID} from 'bson';

import { db } from './';
import { Credential } from '../types/credential';

/**
 * The DCC VC standard is in flux right now,
 * so we are choosing to store credentials as
 * stringified JSON.
 */
export type CredentialRecordRaw = {
  readonly _id: ObjectID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly rawCredential: string;
  readonly credential: Credential;
}

export class CredentialRecord implements CredentialRecordRaw {
  readonly _id!: ObjectID;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly rawCredential!: string;

  get credential(): Credential {
    return JSON.parse(this.rawCredential) as Credential;
  }

  static schema: Realm.ObjectSchema = {
    name: 'CredentialRecord',
    properties: {
      _id: 'objectId',
      rawCredential: 'string',
      createdAt: 'date',
      updatedAt: 'date',
    },
    primaryKey: '_id',
  };

  asRaw(): CredentialRecordRaw {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      rawCredential: this.rawCredential,
      credential: this.credential,
    };
  }

  static rawFrom(credential: Credential): CredentialRecordRaw {
    return {
      _id: new ObjectID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rawCredential: JSON.stringify(credential),
      credential,
    };
  }

  static async addCredential(credential: CredentialRecordRaw): Promise<void> { 
    await db.withInstance((instance) => {
      instance.write(() => {
        instance.create(CredentialRecord.name, credential);
      });
    });
  }

  static getAllCredentials(): Promise<CredentialRecordRaw[]> {
    return db.withInstance((instance) => {
      const results = instance.objects<CredentialRecord>(CredentialRecord.name);

      // Results is not an array, but supports map only if it has length... :/
      if (results.length) {
        return results.map((record) => record.asRaw());
      }

      return [];
    });
  }

  static async deleteCredential(rawRecord: CredentialRecordRaw): Promise<void> {
    await db.withInstance((instance) => {
      const objectId = new ObjectID(rawRecord._id);
      const credentialRecord = instance.objectForPrimaryKey(CredentialRecord.name, objectId);

      instance.write(() => {
        instance.delete(credentialRecord);
      });
    });
  }
}
