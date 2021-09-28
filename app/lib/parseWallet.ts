import { ParsedWalletContents, WalletContent, UnlockedWallet } from '../types/wallet';
import { Credential } from '../types/credential';
import { DidDocument, DidKey } from '../types/did';

function isCredential(item: WalletContent): item is Credential {
  return (item as Credential)['@context']?.includes('https://www.w3.org/2018/credentials/v1') ;
}

function isDidDocument(item: WalletContent): item is DidDocument {
  return (item as DidDocument)['@context']?.includes('https://www.w3.org/ns/did/v1') ;
}

function isVerificationKey(item: WalletContent): item is DidKey {
  return (item as DidKey)?.type === 'Ed25519VerificationKey2020' ;
}

function isKeyAgreementKey(item: WalletContent): item is DidKey {
  return (item as DidKey)?.type === 'X25519KeyAgreementKey2020' ;
}

/**
 * The Unlocked Wallet spec doesn't have a good way to differentiate
 * between wallet content types so this function identifies them based
 * on object shape.
 */
export function parseWalletContents(rawWallet: string): ParsedWalletContents {
  const { contents }: UnlockedWallet = JSON.parse(rawWallet);

  const credentials = contents.filter(isCredential);
  const didDocument = contents.find(isDidDocument);
  const verificationKey = contents.find(isVerificationKey);
  const keyAgreementKey = contents.find(isKeyAgreementKey);

  const errorMessage = (key: string) => `Unable to parse wallet contents. Missing ${key}`;
  if (didDocument === undefined) throw new Error(errorMessage('didDocument'));
  if (verificationKey === undefined) throw new Error(errorMessage('verificationKey'));
  if (keyAgreementKey === undefined) throw new Error(errorMessage('keyAgreementKey'));

  return { credentials, didDocument, verificationKey, keyAgreementKey };
}