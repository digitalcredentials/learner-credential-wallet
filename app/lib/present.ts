import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';

import type { CredentialObject } from '../model/dao/Credential';

// TODO: Actually share a VP, not an array of credentials
export async function sharePresentation(credentialObjects: CredentialObject[]): Promise<void> {
  const filePath = `${RNFS.DocumentDirectoryPath}/presentation.json`;
  const credentials = credentialObjects.map(({ credential }) => credential);

  await RNFS.writeFile(filePath, JSON.stringify(credentials), 'utf8');

  Share.open({
    title: 'Presentation',
    message: 'Share this presentation',
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: 'Presentation',
  });
}
