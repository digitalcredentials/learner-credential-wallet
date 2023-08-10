import CryptoJS from 'crypto-js';

const LOCKED_PREFIX = 'LOCKED:';

export function isLocked(data: string): boolean  {
  try {
    const cred = JSON.parse(data);
    if (cred.type.indexOf('EncryptedWallet') != -1){
      return true;
    }
  } catch (err) {
    console.log('Could not load wallet data', err);
  }
  return false;
}

export async function encryptData(data: string, passphrase: string): Promise<string> {
  const encryptedFile = CryptoJS.AES.encrypt(data, passphrase);
  return `${LOCKED_PREFIX}${encryptedFile}`;
}
