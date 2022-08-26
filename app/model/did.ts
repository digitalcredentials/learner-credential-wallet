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
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      updatedAt: 'date',
      rawDidDocument: 'string',
      rawKeyAgreementKey: 'string',
      rawVerificationKey: 'string',
    },
  };

  asRaw(): DidRecordRaw {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      rawDidDocument: this.rawDidDocument,
      didDocument: this.didDocument,
      rawKeyAgreementKey: this.rawKeyAgreementKey,
      keyAgreementKey: this.keyAgreementKey,
      rawVerificationKey: this.rawVerificationKey,
      verificationKey: this.verificationKey,
    };
  }

  static async addDidRecord({ didDocument, verificationKey, keyAgreementKey }: AddDidRecordParams ): Promise<DidRecordRaw> { 
    const rawDidRecord: DidRecordRaw = {
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

    return db.withInstance((instance) => 
      instance.write(() => 
        instance.create<DidRecord>(DidRecord.schema.name, rawDidRecord).asRaw(),
      ),
    );
  }

  static getAllDidRecords(): Promise<DidRecordRaw[]> {
    return db.withInstance((instance) => {
      const results = instance.objects<DidRecord>(DidRecord.schema.name);
      return results.length ? results.map((record) => record.asRaw()) : [];
    });
  }

  static async deleteDidRecord(rawDidRecord: DidRecordRaw): Promise<void> {
    await db.withInstance((instance) => {
      const didRecord = instance.objectForPrimaryKey(DidRecord.schema.name, new ObjectID(rawDidRecord._id));

      instance.write(() => {
        instance.delete(didRecord);
      });
    });
  }
}

export type AddDidRecordParams = {
  didDocument: DidDocument,
  verificationKey: DidKey,
  keyAgreementKey: DidKey,
}
