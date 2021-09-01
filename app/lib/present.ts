import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';

import type { Credential } from '../types';

// TODO: Actually share a VP, not an array of credentials
export async function sharePresentation(credentials: Credential[]): void {
  const filePath = `${RNFS.DocumentDirectoryPath}/presentation.json`;

  await RNFS.writeFile(filePath, JSON.stringify(credentials), 'utf8');

  Share.open({
    title: 'Presentation',
    message: 'Share this presentation',
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: 'Presentation',
  });
}
