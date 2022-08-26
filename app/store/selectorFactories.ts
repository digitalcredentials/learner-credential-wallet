import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '.';
import { CredentialRecordRaw, DidRecordRaw, ProfileRecordRaw, ProfileWithCredentialRecords } from '../model';
import { selectRawCredentialRecords } from './slices/credential';
import { selectRawDidRecords } from './slices/did';
import { selectRawProfileRecords } from './slices/profile';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectorProps = any;
export type Selector<Props, Return> = (state: RootState, props: Props) => Return; 

const selectProps = (state: RootState, props: SelectorProps) => props;

function expectValue<T>(value: T): NonNullable<T> {
  if (value !== undefined && value !== null) {
    return value as NonNullable<T>;
  } else {
    throw new Error(`Invalid setup, select value was ${value}`);
  }
}

export const makeSelectProfileFromCredential = (): Selector<
  { rawCredentialRecord: CredentialRecordRaw }, 
  ProfileRecordRaw
> =>
  createSelector(
    [
      selectRawProfileRecords, 
      selectProps,
    ],
    (rawProfileRecords, { rawCredentialRecord }) =>
      expectValue(
        rawProfileRecords.find(
          ({ _id }) => _id.equals(rawCredentialRecord.profileRecordId)
        )
      )
  );

export const makeSelectDidFromProfile = (): Selector<
  { rawProfileRecord: ProfileRecordRaw },
  DidRecordRaw
> =>
  createSelector(
    [selectRawDidRecords, selectProps],
    (rawDidRecords, { rawProfileRecord }) =>
      expectValue(
        rawDidRecords.find(
          ({ _id }) => _id.equals(rawProfileRecord.didRecordId)
        )
      )
  );

export const makeSelectDidForCredential = (): Selector<
  { rawCredentialRecord: CredentialRecordRaw },
  DidRecordRaw
> =>
  createSelector(
    [makeSelectProfileFromCredential(), selectRawDidRecords],
    (rawProfileRecord, rawDidRecords) =>
      expectValue(
        rawDidRecords.find(
          ({ _id }) => _id.equals(rawProfileRecord.didRecordId)
        )
      )
  );

export const makeSelectProfilesWithCredentials = (): Selector<
  undefined,
  ProfileWithCredentialRecords[]
> =>
  createSelector(
    [selectRawProfileRecords, selectRawCredentialRecords],
    (rawProfileRecords, rawCredentialRecords) =>
      expectValue(
        rawProfileRecords.map((rawProfileRecord) => ({
          ...(rawProfileRecord),
          rawCredentialRecords: rawCredentialRecords.filter(
            ({ profileRecordId }) =>
              profileRecordId.equals(rawProfileRecord._id)
          ),
        }))
      )
  );

