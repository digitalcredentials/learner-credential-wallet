import * as MsrCrypto from '@microsoft/msrcrypto';
//import { wallet as transmuteWallet, passwordToKey } from '../lib/uw/index.ts';


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
  const iterations = 12000;

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

  //console.log(keyEncryptionKey);
  //console.log(await MsrCrypto.subtle.exportKey('raw', contentEncryptionKey));
  //console.log(encrypted);
  //console.log(wrappedKey);
  //console.log(ciphertext);
  //console.log(tag);

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
 
  //console.log(await MsrCrypto.subtle.exportKey('raw', contentEncryptionKey));
  //console.log(encrypted)
 
  const decrypted = new Uint8Array (await MsrCrypto.subtle.decrypt(
    {name: 'AES-GCM', iv, tagLength, additionalData},
    contentEncryptionKey,
    encrypted
  ));
  return new TextDecoder().decode(decrypted);
}


async function testAesKw(){
  const extractable = true;

  const publicKey = new Uint8Array([
        117, 150, 176, 172, 213, 188, 140,
        209,  46,  14,   0, 188, 180,  95,
         66, 183, 120, 214, 155, 149,  56,
        127, 129, 181, 192, 165, 179, 148,
         42, 226, 248,  12
  ]);

  const cek = await MsrCrypto.subtle.generateKey(
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt']
  );
  console.log('cek ', cek);

  const kek = await MsrCrypto.subtle.importKey(
    'raw', publicKey, {name: 'AES-KW', length: 256},
    true,
    ['wrapKey', 'unwrapKey']
  );
  console.log('kek: ', kek);
  console.log('kek: ', kek.usages);
  kek.usages = ['wrapKey', 'unwrapKey']; // Why does importKey change this?

  const wrappedKey = await MsrCrypto.subtle.wrapKey(
    'raw', cek, kek, kek.algorithm
  );
  console.log('wrapKey iii', wrappedKey);
}

async function testAesGCMKW(){
  //const crypto = new Crypto();
  const extractable = true;
  const publicKey = new Uint8Array([
        117, 150, 176, 172, 213, 188, 140,
        209,  46,  14,   0, 188, 180,  95,
         66, 183, 120, 214, 155, 149,  56,
        127, 129, 181, 192, 165, 179, 148,
         42, 226, 248,  12
  ]);
  const iv = new Uint8Array([1,2,3,4,5,6,7,8,9,10,11,12]);
  
  const cek = await MsrCrypto.subtle.generateKey(
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt']
  );
  console.log('cek ', cek);
  
  const kek = await MsrCrypto.subtle.importKey(
    'raw',
    publicKey,
    {name: 'AES-GCM', length: 256},
    true,
    ['encrypt', 'decrypt'],
  );
  console.log('kek ', kek);
  
  const wrappedKey = await MsrCrypto.subtle.wrapKey(
    'raw', cek, kek, {...kek.algorithm, iv}
  );
  console.log('wrappedKey', new Uint8Array(wrappedKey));
}


async function testPBES2(){
  jwe = await encrypt({this: "is a scret", messa: "ge"}, "password");
  console.log(jwe);
  console.log(jwe.recipients);

  let msg = await decrypt(jwe, 'password');
  console.log(msg);
}

export async function exportWalletEncrypted(data: string, passphrase: string): Provise<void> {

  //await testPBES2();
  //return;

  //await testAesGCMKW();
  //return;

  //await testAesKw();
  //return;

  const walletData = data;
  console.log(walletData);

  let encryptedWallet = await encrypt(data, passphrase);
  /*transmuteWallet.add(walletData);
  try {
    encryptedWallet = await transmuteWallet.export('passphrase');
  } catch (error) {
    console.log(error);
  }*/

  console.log('------------------------');
  console.log(encryptedWallet);
  console.log('------------------------');
  
  return JSON.stringify(encryptedWallet);
}
