import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import { Platform } from 'react-native';

import { db } from '../model';

export async function exportWallet(): Promise<void> {
  const fileName = 'Wallet Backup';
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  const wallet = await db.export();

  /**
   * On Android, RNFS doesn't truncate the file before writing, 
   * so we have to check if it already exists.
   */
  if (await RNFS.exists(filePath)) {
    await RNFS.unlink(filePath);
  }

  const walletString = JSON.stringify(wallet, null, 2);
  await RNFS.writeFile(filePath, walletString, 'utf8');

  Share.open({
    title: fileName,
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: fileName,
    message: Platform.OS === 'ios' ? undefined : walletString,
  });
}
