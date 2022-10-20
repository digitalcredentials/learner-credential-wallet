import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import { Platform } from 'react-native';

import { ProfileRecord, ProfileRecordRaw } from '../model';
import { encryptData } from './encrypt';

export const LOCKED_PROFILE_PREFIX = 'locked_profile:';
export const LOCKED_WALLET_PREFIX = 'locked_wallet:';

export async function exportProfile(rawProfileRecord: ProfileRecordRaw, encryptPassphrase?: string): Promise<void> {
  const fileName = 'Profile Backup';

  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;
  const exportedProfile = await ProfileRecord.exportProfileRecord(rawProfileRecord);
  const exportedProfileString = JSON.stringify(exportedProfile, null, 2);

  const data = encryptPassphrase 
    ? encryptData(exportedProfileString, encryptPassphrase)
    : exportedProfileString;

  /**
   * On Android, RNFS doesn't truncate the file before writing, 
   * so we have to check if it already exists.
   */
  if (await RNFS.exists(filePath)) {
    await RNFS.unlink(filePath);
  }
  await RNFS.writeFile(filePath, data, 'utf8');

  await Share.open({
    title: fileName,
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: fileName,
    message: Platform.OS === 'ios' ? undefined : data,
  });
}

export async function exportWallet(encryptPassphrase?: string): Promise<void> {
  const fileName = 'Wallet Backup';
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}.json`;

  const rawProfileRecords = await ProfileRecord.getAllProfileRecords();
  const exportedProfiles = await Promise.all(rawProfileRecords.map(ProfileRecord.exportProfileRecord));
  const exportedWalletString = JSON.stringify(exportedProfiles, null, 2);

  const data = await encryptData(exportedWalletString, 'password');

  /*
  const data = encryptPassphrase 
    ? encryptData(exportedWalletString, encryptPassphrase)
    : exportedWalletString;
  */

  /**
   * On Android, RNFS doesn't truncate the file before writing, 
   * so we have to check if it already exists.
   */
  if (await RNFS.exists(filePath)) {
    await RNFS.unlink(filePath);
  }
  await RNFS.writeFile(filePath, data, 'utf8');

  await Share.open({
    title: fileName,
    url: `file://${filePath}`,
    type: 'text/plain',
    subject: fileName,
    message: Platform.OS === 'ios' ? undefined : data,
  });
}
