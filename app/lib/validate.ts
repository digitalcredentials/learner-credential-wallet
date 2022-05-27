import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { purposes } from '@digitalcredentials/jsonld-signatures';
import vc from '@digitalcredentials/vc';

import { VerifiablePresentation, PresentationError } from '../types/presentation';
import { Credential, CredentialError } from '../types/credential';

import { securityLoader } from './documentLoader';
import { registries } from './registry';

const documentLoader = securityLoader().build();
const suite = new Ed25519Signature2020();
const presentationPurpose = new purposes.AssertionProofPurpose();

export async function verifyPresentation(
  presentation: VerifiablePresentation,
  unsignedPresentation = true,
): Promise<boolean> {
  try {
    const result = await vc.verify({
      presentation,
      presentationPurpose,
      suite,
      documentLoader,
      unsignedPresentation,
    });

    console.log(JSON.stringify(result));
    return result.verified;
  } catch (err) {
    console.warn(err);

    throw new Error(PresentationError.CouldNotBeVerified);
  }
}

export async function verifyCredential(credential: Credential): Promise<boolean> {
  const { issuer } = credential;

  const issuerDid = typeof issuer === 'string' ? issuer : issuer.id;

  if (!await registries.issuerDid.isInRegistry(issuerDid)) {
    throw new Error(CredentialError.DidNotInRegistry);
  }

  try {
    const result = await vc.verifyCredential({
      credential,
      suite,
      documentLoader,
    });

    return result.verified;
  } catch (err) {
    console.warn(err);

    throw new Error(CredentialError.CouldNotBeVerified);
  }
}
