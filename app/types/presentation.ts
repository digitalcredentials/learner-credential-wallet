import type { Credential, Proof } from './credential';

export type VerifiablePresentation = {
  readonly '@context': string[];
  readonly holder: string;
  readonly type: string;
  readonly verifiableCredential: Credential | Credential[];
  readonly proof: Proof;
}

export enum PresentationError {
  IsNotVerified = 'Presentation is not verified.',
  CouldNotBeVerified = 'Presentation encoded could not be checked for verification and may be malformed.',
  DidNotInRegistry = 'Could not find issuer in registry with given DID.',
}
