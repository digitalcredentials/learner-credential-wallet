import { Credential } from './credential';
import { DidDocument, DidKey } from './did';
import { ProfileMetadata } from './profile';

export type WalletContent = Credential | DidDocument | DidKey | ProfileMetadata;

export type ParsedWalletContents = { 
  credentials: Credential[]; 
  didDocument: DidDocument; 
  verificationKey: DidKey;
  keyAgreementKey: DidKey;
  profileMetadata?: ProfileMetadata;
};

export type UnlockedWallet = {
  readonly '@context': string[];
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly contents: WalletContent[];
}

export type JwePayload = {
  recipients: JwePayloadRecipient[];
  iv: string;
  ciphertext: string;
  tag: string;
}

type JwePayloadRecipient = {
  encrypted_key: string;
  header: {
    p2s: string;
    p2c: string;
  };
}
