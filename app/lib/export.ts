import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';

import { db } from '../model';

export async function exportWallet(): Promise<void> {
  const filePath = `${RNFS.DocumentDirectoryPath}/exported-wallet.json`;
  const walletFile = await db.export();

  /**
   * On Android, RNFS doesn't truncate the file before writing, 
   * so we have to check if it already exists.
   */
  if (await RNFS.exists(filePath)) {
    await RNFS.unlink(filePath);
  }

  await RNFS.writeFile(filePath, walletFile, 'utf8');

  Share.open({
    title: 'Wallet',
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: 'Wallet',
  });
}
