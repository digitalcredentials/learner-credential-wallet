import Realm from 'realm';
import { ObjectID} from 'bson';

import { db } from './';
import { DidKey, DidDocument } from '../types/did';

export type DidRecordRaw = {
  readonly _id: ObjectID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly rawDidDocument: string;
  readonly didDocument: DidDocument;
  readonly rawVerificationKey: string;
  readonly verificationKey: DidKey;
  readonly rawKeyAgreementKey: string;
  readonly keyAgreementKey: DidKey;
};

export class DidRecord implements DidRecordRaw {
  readonly _id!: ObjectID;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly rawDidDocument!: string;
  readonly rawDidKey!: string;
  readonly rawVerificationKey!: string;
  readonly rawKeyAgreementKey!: string;

  get didDocument(): DidDocument {
    return JSON.parse(this.rawDidDocument) as DidDocument;
  }

  get verificationKey(): DidKey {
    return JSON.parse(this.rawVerificationKey) as DidKey;
  }

  get keyAgreementKey(): DidKey {
    return JSON.parse(this.rawKeyAgreementKey) as DidKey;
  }

  static schema: Realm.ObjectSchema = {
    name: 'DidRecord',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      updatedAt: 'date',
      rawKeyAgreementKey: 'string',
      rawVerificationKey: 'string',
    },
    primaryKey: '_id',
  };

  asRaw(): DidRecordRaw {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      rawDidDocument: this.rawDidDocument,
      didDocument: this.didDocument,
      rawKeyAgreementKey: this.rawKeyAgreementKey,
      keyAgreementKey: this.agreementKey,
      rawVerificationKey: this.rawVerificationKey,
      verificationKey: this.verificationKey,
    };
  }

  static async initializeIdentity(): Promise<void> {
  }

  static rawFrom(
    didDocument: DidKey,
    verificationKey: DidKey,
    keyAgreementKey: DidKey,
  ): DidRecordRaw {
    return {
      _id: new ObjectID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rawDidDocument: JSON.stringify(didDocument),
      didDocument,
      rawVerificationKey: JSON.stringify(verificationKey),
      verificationKey,
      rawKeyAgreementKey: JSON.stringify(keyAgreementKey),
      keyAgreementKey,
    };
  }

  static async addDidRecord(
    didDocument: DidDocument,
    verificationKey: DidKey,
    keyAgreementKey: DidKey,
  ): Promise<void> { 
    await db.withInstance((instance) => {
      instance.write(() => {
        instance.create(DidRecord.name, DidRecord.rawFrom(
          didDocument,
          verificationKey,
          keyAgreementKey,
        ));
      });
    });
  }

  static getAllDidRecords(): Promise<DidRecordRaw[]> {
    return db.withInstance((instance) => {
      const results = instance.objects<DidRecord>(DidRecord.name);

      // Results is not an array, but supports map only if it has length... :/
      if (results.length) {
        return results.map((record) => record.asRaw());
      }

      return [];
    });
  }

  static async deleteDidRecords(rawRecord: DidRecordRaw): Promise<void> {
    await db.withInstance((instance) => {
      const objectId = new ObjectID(rawRecord._id);
      const didRecord = instance.objectForPrimaryKey(DidRecord.name, objectId);

      instance.write(() => {
        instance.delete(didRecord);
      });
    });
  }
}
