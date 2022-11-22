import { createUnsignedPresentation, sharePresentation } from '../lib/present';
import { CredentialRecordRaw } from '../model/credential';

export function useShareCredentials(): (credentials: CredentialRecordRaw[]) => void {
  // const getDidFor = useSelectorCallback(makeSelectDidForCredential);

  return (rawCredentialRecords: CredentialRecordRaw[]) => {
    /**
     * Right now we're leaving the presentation unsigned. To enable signed presentation sharing
     * Uncomment these lines and pass `rawDidRecord` to `sharePresentation`
     */
    // if (!verifyMatchingProfiles(credentials)) {
    //   throw new Error('Credentials must exist in same profile to be shared as a Verifiable Presentation.');
    // }

    // const rawDidRecord = getDidFor({ rawCredentialRecord: credentials[0] });
    const credentials = rawCredentialRecords.map(({ credential }) => credential);
    const presentation = createUnsignedPresentation(credentials);
    sharePresentation(presentation);
  };
}

// function verifyMatchingProfiles(credentials: CredentialRecordRaw[]): boolean {
//   const { profileRecordId } = credentials[0];
//   return credentials.every((credential) => 
//     credential.profileRecordId.equals(profileRecordId)
//   );
// }
