import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { purposes } from '@digitalcredentials/jsonld-signatures';
import { checkStatus } from '@digitalcredentials/vc-status-list';
import vc from '@digitalcredentials/vc';

import { VerifiablePresentation, PresentationError } from '../types/presentation';
import { Credential, CredentialError } from '../types/credential';

import { securityLoader } from '@digitalcredentials/security-document-loader';
import { registries } from './registry';
import { extractCredentialsFrom } from './verifiableObject';

const documentLoader = securityLoader().build();
const suite = new Ed25519Signature2020();
const presentationPurpose = new purposes.AssertionProofPurpose();


export type ResultLog = {
  id: string,
  valid: boolean
}

export type Result = {
  verified: boolean;
  credential: Credential;
  error: CredentialError;
  log: ResultLog[];
}

export type VerifyResponse = {
  verified: boolean;
  results: Result[];
}

export async function verifyPresentation(
  presentation: VerifiablePresentation,
  unsignedPresentation = true,
): Promise<VerifyResponse> {
  try {
    const hasRevocation = extractCredentialsFrom(presentation)?.find(vc => vc.credentialStatus);
    const result = await vc.verify({
      presentation,
      presentationPurpose,
      suite,
      documentLoader,
      unsignedPresentation,
      // Only check revocation status if any VC has a 'credentialStatus' property
      checkStatus: hasRevocation ? checkStatus : undefined
    });

    console.log(JSON.stringify(result));
    return result;
  } catch (err) {
    console.warn(err);

    throw new Error(PresentationError.CouldNotBeVerified);
  }
}

export async function verifyCredential(credential: Credential): Promise<VerifyResponse> {
  const { issuer } = credential;

  const issuerDid = typeof issuer === 'string' ? issuer : issuer.id;

  if (!await registries.issuerDid.isInRegistry(issuerDid)) {
    throw new Error(CredentialError.DidNotInRegistry);
  }

  try {
    const hasRevocation = extractCredentialsFrom(credential)?.find(vc => vc.credentialStatus);
    const result = await vc.verifyCredential({
      credential,
      suite,
      documentLoader,
      // Only check revocation status if VC has a 'credentialStatus' property
      checkStatus: hasRevocation ? checkStatus : undefined
    });

    return result;
  } catch (err) {
    console.warn(err);
    throw new Error(CredentialError.CouldNotBeVerified);
  }
}
