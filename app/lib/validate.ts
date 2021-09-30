import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { purposes } from '@digitalcredentials/jsonld-signatures';
import vc from '@digitalcredentials/vc';

import { isInRegistry } from './registry';
import { VerifiablePresentation, PresentationError } from '../types/presentation';
import type { Credential } from '../types/credential';

import { securityLoader } from './documentLoader';

const documentLoader = securityLoader().build();
const suite = new Ed25519Signature2020();
const verificationPurpose = new purposes.AssertionProofPurpose();

export async function verifyPresentation(presentation: VerifiablePresentation): Promise<boolean> {
  const { holder } = presentation;

  if (!isInRegistry(holder)) {
    throw new Error(PresentationError.DidNotInRegistry);
  }

  try {
    const { valid } = await vc.verify({
      presentation,
      verificationPurpose,
      suite,
      documentLoader,
    });

    return valid;
  } catch (err) {
    console.warn(err);

    throw new Error(PresentationError.CouldNotBeVerified);
  }
}

export async function verifyCredential(credential: Credential): Promise<boolean> {
  try {
    const { valid } = await vc.verifyCredential({
      credential,
      suite,
      documentLoader,
    });

    return valid;
  } catch (err) {
    console.warn(err);

    throw new Error(CredentialError.CouldNotBeVerified);
  }
}
