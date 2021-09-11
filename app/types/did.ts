export type DidKey = {
  readonly type: string;
  readonly id: string;
  readonly controller: string;
  readonly publicKeyMultibase: string;
  readonly privateKeyMultibase: string;
}

export type DidDocument = {
  readonly '@context': string[];
  readonly id: string;
  readonly verificationMethod: DidKey[];
  readonly authentication: string[];
  readonly assertionMethod: string[];
  readonly capabilityDelegation: string[];
  readonly capabilityInvocation: string[];
  readonly keyAgreement: DidKey[];
};
