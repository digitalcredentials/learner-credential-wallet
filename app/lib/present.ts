import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';

import type { CredentialRecordRaw } from '../model/credential';

// TODO: Actually share a VP, not an array of credentials
export async function sharePresentation(rawCredentialRecords: CredentialRecordRaw[]): Promise<void> {
  const filePath = `${RNFS.DocumentDirectoryPath}/presentation.json`;
  const credentials = rawCredentialRecords.map(({ credential }) => credential);

  await RNFS.writeFile(filePath, JSON.stringify(credentials), 'utf8');

  Share.open({
    title: 'Presentation',
    message: 'Share Credentials',
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: 'Presentation',
  });
}
