import Realm from 'realm';

import DatabaseAccess from './db';
import { CredentialRecord } from './credential';

const models: Realm.ObjectClass[] = [
  CredentialRecord,
];

export {
  models,
  DatabaseAccess as db,
  CredentialRecord,
};
