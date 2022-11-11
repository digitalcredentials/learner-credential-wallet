import * as MsrCrypto from '@microsoft/msrcrypto';
import uuid from 'react-native-uuid';
import { JwePayload } from '../types/wallet';

async function deriveKeyEncryptionKey(password: string, salt: Buffer, iterations: number | string) {
  const passphraseKey = Buffer.from(password);
  const saltBuffer = Buffer.from(salt);

  const importedKey = await MsrCrypto.subtle.importKey(
    'raw',
    passphraseKey,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const keyEncryptionBits = await MsrCrypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: iterations,
      hash: {name: 'SHA-512'}
    },
    importedKey,
    256
  );

  // return keyEncryptionKey
  return MsrCrypto.subtle.importKey(
    'raw',
    keyEncryptionBits,
    { name: 'AES-KW', length: 256 },
    true,
    ['wrapKey', 'unwrapKey']
  );
}


async function encrypt(data: unknown, password: string) {
  const saltBuffer = Buffer.from(crypto.getRandomValues(new Uint8Array(16)));
  const iterations = 120000;

  const keyEncryptionKey = await deriveKeyEncryptionKey(password, saltBuffer, iterations);

  const contentEncryptionKey = await MsrCrypto.subtle.generateKey(
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt']
  );

  const wrappedKey = await MsrCrypto.subtle.wrapKey(
    'raw', contentEncryptionKey, keyEncryptionKey, { name: 'AES-KW', length: 256 }
  );

  const iv = MsrCrypto.getRandomValues(new Uint8Array(12));

  const msgToEncrypt = new TextEncoder().encode(JSON.stringify(data)); // probably need to base64 this
  const additionalData = undefined;

  // encrypt data
  const tagBytes = 16;
  const tagLength = tagBytes * 8;
  const encrypted = new Uint8Array(await MsrCrypto.subtle.encrypt(
    { name: 'AES-GCM', iv, tagLength, additionalData}, contentEncryptionKey, msgToEncrypt)
  );
  // split ciphertext and tag
  const ciphertext = encrypted.subarray(0, encrypted.length - tagBytes);
  const tag = encrypted.subarray(encrypted.length - tagBytes);

  const jwe = {
    'recipients': [
      {
        'header': {
          alg:'PBES2-HS512+A256KW',
          p2s: saltBuffer.toString('base64'),
          p2c: iterations,
          enc: 'A256GCM',
        },
        'encrypted_key': Buffer.from(wrappedKey).toString('base64')
      },
    ],
    'iv': Buffer.from(iv).toString('base64'),
    'ciphertext': Buffer.from(ciphertext).toString('base64'),
    'tag': Buffer.from(tag).toString('base64'),
  };
  return jwe;
}

async function decrypt(jwe: JwePayload, password: string) {
  const recipient = jwe.recipients[0];
  const salt = Buffer.from(recipient.header.p2s, 'base64');
  const iterations = recipient.header.p2c;
  const iv = Buffer.from(jwe.iv, 'base64');
  const ciphertext = Buffer.from(jwe.ciphertext, 'base64');
  const tag = Buffer.from(jwe.tag, 'base64');
  const tagBytes = 16;
  const tagLength = tagBytes * 8;
  const additionalData = undefined;

  const keyEncryptionKey = await deriveKeyEncryptionKey(password, salt, iterations);

  const contentEncryptionKey = await MsrCrypto.subtle.unwrapKey(
    'raw',
    Buffer.from(recipient.encrypted_key, 'base64'),
    keyEncryptionKey,
    {name: 'AES-KW', length: 256},
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt', 'decrypt']
  );

  const encrypted = new Uint8Array(ciphertext.length + tag.length);
  encrypted.set(ciphertext);
  encrypted.set(tag, ciphertext.length);

  const decrypted = new Uint8Array (await MsrCrypto.subtle.decrypt(
    {name: 'AES-GCM', iv, tagLength, additionalData},
    contentEncryptionKey,
    encrypted
  ));
  return JSON.parse(new TextDecoder().decode(decrypted));
}

export async function exportWalletEncrypted(data: string, passphrase: string): Promise<string> {
  const walletData = JSON.parse(data);
  let walletId = walletData.id;
  if (!walletId && Array.isArray(walletData) && walletData.length > 0){
    walletId = walletData[0].id;
  }

  const encryptedWallet = await encrypt(data, passphrase);

  const lockedWallet = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'http://w3id.org/wallet/v1'
    ],
    id: walletId,
    type: ['VerifiableCredential', 'EncryptedWallet'],
    issuer: 'did:web:lcw.app',
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: `urn:uuid:${uuid.v4()}`,
      jwe: encryptedWallet
    }
  };

  return JSON.stringify(lockedWallet);
}

export async function importWalletEncrypted(data: string, passphrase: string): Promise<string> {
  const lockedWallet = JSON.parse(data);
  const jwe = lockedWallet.credentialSubject.jwe;
  const wallet = await decrypt(jwe, passphrase);
  const walletString = JSON.stringify(wallet);

  return walletString;
}
