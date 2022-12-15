import { ProfileRecord, ProfileRecordRaw } from '../model';
import { exportWalletEncrypted } from './lockedWallet';
import { shareData } from './shareData';

export async function exportProfile(rawProfileRecord: ProfileRecordRaw, encryptPassphrase?: string): Promise<void> {
  const exportedProfile = await ProfileRecord.exportProfileRecord(rawProfileRecord);
  const exportedProfileString = JSON.stringify([exportedProfile], null, 2);

  const data = encryptPassphrase 
    ? await exportWalletEncrypted(exportedProfileString, encryptPassphrase)
    : exportedProfileString;

  await shareData('Profile Backup.json', data);
}

export async function exportWallet(encryptPassphrase?: string): Promise<void> {
  const rawProfileRecords = await ProfileRecord.getAllProfileRecords();
  const exportedProfiles = await Promise.all(rawProfileRecords.map(ProfileRecord.exportProfileRecord));
  const exportedWalletString = JSON.stringify(exportedProfiles, null, 2);

  const data = encryptPassphrase 
    ? await exportWalletEncrypted(exportedWalletString, encryptPassphrase)
    : exportedWalletString;

  await shareData('Wallet Backup.json', data);
}
