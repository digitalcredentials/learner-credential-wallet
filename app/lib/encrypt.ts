import CryptoJS from 'crypto-js';
import { HumanReadableError } from './error';

const LOCKED_PREFIX = 'LOCKED:';

export function isLocked(data: string): boolean  {
  return data.startsWith(LOCKED_PREFIX);
}

export function decryptData(data: string, passphrase: string): string {
  const encryptedFile = data.replace(LOCKED_PREFIX, '');

  try {
    return CryptoJS.AES.decrypt(encryptedFile, passphrase).toString(CryptoJS.enc.Utf8);
  } catch (err) {
    throw new HumanReadableError('Invalid password');
  }
}

export function encryptData(data: string, passphrase: string): string {
  const encryptedFile = CryptoJS.AES.encrypt(data, passphrase);
  return `${LOCKED_PREFIX}${encryptedFile}`;
}
