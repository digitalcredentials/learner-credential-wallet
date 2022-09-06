import { createSelector } from '@reduxjs/toolkit';
import { ProfileRecordRaw } from '../../model';
import { selectRawProfileRecords } from '../slices/profile';
import { Selector } from '.';
import { PendingCredential, selectPendingCredentials } from '../slices/credentialFoyer';
import { selectRawDidRecords } from '../slices/did';

export const makeSelectProfileForPendingCredentials = (): Selector<
  undefined, 
  ProfileRecordRaw | null
> => createSelector(
  [selectRawProfileRecords, selectRawDidRecords, selectPendingCredentials],
  (rawProfileRecords, rawDidRecords, pendingCredentials) => {
    const didKey = reduceCommonDidKeyFrom(pendingCredentials);
    if (didKey) {
      const rawDidRecord = rawDidRecords.find(({ didDocument }) => didDocument.id === didKey);
      if (rawDidRecord) {
        const rawProfileRecord = rawProfileRecords.find(({ didRecordId }) => didRecordId.equals(rawDidRecord._id)) || null;
        return rawProfileRecord;
      }      
    }

    console.debug(`Could not infer profile for pending credential(s), see below:
Credential DID: "${didKey}"
Profile DIDs: ${JSON.stringify(Object.fromEntries(rawProfileRecords.map(({ profileName, didRecordId }) => [profileName, rawDidRecords.find(({ _id }) => _id.equals(didRecordId))?.didDocument.id])), null, 2)}
    `);

    return null;
  }
);

function reduceCommonDidKeyFrom(pendingCredentials: PendingCredential[]): string | null {
  const didKeyFrom = (pendingCredential: PendingCredential) => pendingCredential.credential.credentialSubject.id || null;

  if (pendingCredentials.length === 0) return null;
  if (pendingCredentials.length === 1) return didKeyFrom(pendingCredentials[0]);

  return pendingCredentials.reduce<string | null>((did, pendingCredential) => {
    return did === didKeyFrom(pendingCredential) ? did : null;
  }, didKeyFrom(pendingCredentials[0]));
}
