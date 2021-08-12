import Realm from 'realm';
import BSON, { ObjectID} from 'bson';

import { Credential } from '../types/credential';

/**
 * The DCC VC standard is in flux right now,
 * so we are choosing to store credentials as
 * stringified JSON.
 */
export interface CredentialRecordRaw {
  readonly _id: ObjectID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly rawCredential: string;
}

/**
 * This class is inherited from, in a way, by the Realm.Object
 * that gets returned from queries. In reality, the objects
 * returned are Proxies that use method lookups that can resolve
 * to methods in this class. Think of it like the method-missing
 * magic in Rails with ActiveRecord.
 *
 * Example:
 * ```typescript
 * db.withInstance(instance => {
 *   for (const cred of instance.objects<CredentialRecord>(CredentialRecord.name)) {
 *     // This method is defined on the class below
 *     console.log(cred.credential);
 *   }
 * });
 * ```
 */
export class CredentialRecord implements CredentialRecordRaw {
  readonly _id!: ObjectID;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly rawCredential!: string;

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

  public get credential(): Credential{
    return JSON.parse(this.rawCredential) as Credential;
  }

  public static fromRaw(credential: Credential): CredentialRecordRaw {
    return {
      _id: new BSON.ObjectID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rawCredential: JSON.stringify(credential),
    };
  }
}
