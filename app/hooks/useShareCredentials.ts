import { useSelector } from 'react-redux';

import { RootState } from '../store';
import { DidState } from '../store/slices/did';
import { sharePresentation } from '../lib/present';
import { CredentialRecordRaw } from '../model/credential';

export function useShareCredentials(): (credentials: CredentialRecordRaw[]) => void {
  const { rawDidRecords } = useSelector<RootState, DidState>(({ did }) => did);

  if (rawDidRecords.length === 0) {
    throw new Error('No DID generated. Something went wrong in wallet initialization.');
  }

  const [ rawDidRecord ] = rawDidRecords;

  return (credentials: CredentialRecordRaw[]) => {
    sharePresentation(credentials, rawDidRecord);
  };
}
