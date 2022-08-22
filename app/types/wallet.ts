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

export type WalletImportResponse = {
  success: string[];
  duplicate: string[];
  failed: string[];
};

export type WalletImportReport = Record<string, string[]>;

export type UnlockedWallet = {
  readonly '@context': string[];
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly contents: WalletContent[];
}
