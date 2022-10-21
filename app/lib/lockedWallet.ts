import * as MsrCrypto from '@microsoft/msrcrypto';

async function deriveKeyEncryptionKey(password, salt, iterations){
  const passphraseKey = Buffer.from(password);
  var saltBuffer = Buffer.from(salt);

  var importedKey = await MsrCrypto.subtle.importKey(
    "raw",
    passphraseKey,
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  var keyEncryptionBits = await MsrCrypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBuffer,
      iterations: iterations,
      hash: {name: "SHA-512"}
    },
    importedKey,
    256
  );

  var keyEncryptionKey = await MsrCrypto.subtle.importKey(
    "raw",
    keyEncryptionBits,
    { name: "AES-KW", length: 256 },
    true,
    ["wrapKey", "unwrapKey"]
  );

  return keyEncryptionKey;
}


async function encrypt(data, password) {
  var saltBuffer = Buffer.from(crypto.getRandomValues(new Uint8Array(16)))
  const iterations = 120000;

  var keyEncryptionKey = await deriveKeyEncryptionKey(password, saltBuffer, iterations);

  var contentEncryptionKey = await MsrCrypto.subtle.generateKey(
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt']
  );

  var wrappedKey = await MsrCrypto.subtle.wrapKey(
    'raw', contentEncryptionKey, keyEncryptionKey, { name: "AES-KW", length: 256 }
  );

  const iv = MsrCrypto.getRandomValues(new Uint8Array(12));

  var msgToEncrypt = new TextEncoder().encode(JSON.stringify(data)); // probaby need to base64 this
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

  let jwe = {
    "recipients": [
      {
        "header": {
          alg:"PBES2-HS512+A256KW",
          p2s: saltBuffer.toString('base64'),
          p2c: iterations,
          enc: "A256GCM",
        },
        "encrypted_key": Buffer.from(wrappedKey).toString('base64')
      },
    ],
    "iv": Buffer.from(iv).toString('base64'),
    "ciphertext": Buffer.from(ciphertext).toString('base64'),
    "tag": Buffer.from(tag).toString('base64'),
  }
  return jwe;
}

async function decrypt(jwe, password){
  const recipient = jwe.recipients[0];
  const salt = Buffer.from(recipient.header.p2s, 'base64');
  const iterations = recipient.header.p2c;
  const iv = Buffer.from(jwe.iv, 'base64');
  const ciphertext = Buffer.from(jwe.ciphertext, 'base64');
  const tag = Buffer.from(jwe.tag, 'base64');
  const tagBytes = 16;
  const tagLength = tagBytes * 8;
  const additionalData = undefined;

  var keyEncryptionKey = await deriveKeyEncryptionKey(password, salt, iterations);

  var contentEncryptionKey = await MsrCrypto.subtle.unwrapKey(
    "raw",
    Buffer.from(recipient.encrypted_key, 'base64'),
    keyEncryptionKey,
    {name: 'AES-KW', length: 256},
    {name: 'AES-GCM', length: 256},
    true,
    ["encrypt", "decrypt"]
  );

  const encrypted = new Uint8Array(ciphertext.length + tag.length);
  encrypted.set(ciphertext);
  encrypted.set(tag, ciphertext.length);
 
  const decrypted = new Uint8Array (await MsrCrypto.subtle.decrypt(
    {name: 'AES-GCM', iv, tagLength, additionalData},
    contentEncryptionKey,
    encrypted
  ));
  return new TextDecoder().decode(decrypted);
}

export async function exportWalletEncrypted(data: string, passphrase: string): Provise<void> {
  const walletData = data;

  let encryptedWallet = await encrypt(data, passphrase);

  let lockedWallet = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "http://w3id.org/wallet/v1"
    ],
    id: "did:web:example.com" + "#encrypted-wallet",
    type: ["VerifiableCredential", "EncryptedWallet"],
    issuer: 'did:web:lcw.app',
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      jwe: encryptedWallet
    }
  };

  console.log('------------------------');
  console.log(encryptedWallet);
  console.log('------------------------');
  
  return JSON.stringify(lockedWallet);
}
