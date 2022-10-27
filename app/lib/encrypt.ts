import CryptoJS from 'crypto-js';
import { HumanReadableError } from './error';
import { importWalletEncrypted } from './lockedWallet';

const LOCKED_PREFIX = 'LOCKED:';

export function isLocked(data: string): boolean  {
  try {
    const cred = JSON.parse(data);
    if (cred.type.indexOf("EncryptedWallet") != -1){
      return true;
    }
  } catch (err) {
    console.log("Couldn't load wallet data", err);
  }
  return false;
}

export async function decryptData(data: string, passphrase: string): string {
  try {
    return await importWalletEncrypted(data, passphrase);
  } catch (err) {
    throw new HumanReadableError('Invalid password');
  }
}

export async function encryptData(data: string, passphrase: string): string {
  const encryptedFile = CryptoJS.AES.encrypt(data, passphrase);
  return `${LOCKED_PREFIX}${encryptedFile}`;
}
