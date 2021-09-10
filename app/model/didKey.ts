import Realm from 'realm';
import { ObjectID} from 'bson';

import { db } from './';
import { DidKey } from '../types/didKey';

export type DidKeyRecordRaw = {
  readonly _id: ObjectID;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly rawDidKey: string;
  readonly didKey: DidKey;
};

export class DidKeyRecord implements DidKeyRecordRaw {
  readonly _id!: ObjectID;
  readonly createdAt!: Date;
  readonly updatedAt!: Date;
  readonly rawDidKey!: string;

  get didKey(): DidKey {
    return JSON.parse(this.rawDidKey) as DidKey;
  }

  static schema: Realm.ObjectSchema = {
    name: 'DidKeyRecord',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      updatedAt: 'date',
      didKey: 'string',
    },
    primaryKey: '_id',
  };

  asRaw(): DidKeyRecordRaw {
    return {
      _id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      rawDidKey: this.rawDidKey,
      didKey: this.didKey,
    };
  }

  static rawFrom(didKey: DidKey): DidKeyRecordRaw {
    return {
      _id: new ObjectID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      rawDidKey: JSON.stringify(didKey),
      didKey,
    };
  }

  static async addDidKey(didKey: DidKey): Promise<void> { 
    await db.withInstance((instance) => {
      instance.write(() => {
        instance.create(DidKeyRecord.name, DidKeyRecord.rawFrom(didKey));
      });
    });
  }

  static getAllDidKeys(): Promise<DidKeyRecordRaw[]> {
    return db.withInstance((instance) => {
      const results = instance.objects<DidKeyRecord>(DidKeyRecord.name);

      // Results is not an array, but supports map only if it has length... :/
      if (results.length) {
        return results.map((record) => record.asRaw());
      }

      return [];
    });
  }

  static async deleteDidKey(rawRecord: DidKeyRecordRaw): Promise<void> {
    await db.withInstance((instance) => {
      const objectId = new ObjectID(rawRecord._id);
      const didKeyRecord = instance.objectForPrimaryKey(DidKeyRecord.name, objectId);

      instance.write(() => {
        instance.delete(didKeyRecord);
      });
    });
  }
}
