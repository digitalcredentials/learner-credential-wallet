import { Ed25519Signature2020 } from '@digitalcredentials/ed25519-signature-2020';
import { purposes } from '@digitalcredentials/jsonld-signatures';
import { checkStatus } from '@digitalcredentials/vc-status-list';
import vc from '@digitalcredentials/vc';

import { VerifiablePresentation, PresentationError } from '../types/presentation';
import { Credential, CredentialError } from '../types/credential';

import { securityLoader } from '@digitalcredentials/security-document-loader';
import { registryCollections } from '@digitalcredentials/issuer-registry-client';
import { extractCredentialsFrom } from './verifiableObject';

const documentLoader = securityLoader({ fetchRemoteContexts: true }).build();
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

    if (!result.verified) {
      console.warn('VP not verified:', JSON.stringify(result, null, 2));
    }
    return result;
  } catch (err) {
    console.warn(err);

    throw new Error(PresentationError.CouldNotBeVerified);
  }
}

export async function verifyCredential(credential: Credential): Promise<VerifyResponse> {
  const { issuer } = credential;
  const issuerDid = typeof issuer === 'string' ? issuer : issuer.id;

  if (credential?.proof?.type === 'DataIntegrityProof') {
    throw new Error(`Proof type not supported: DataIntegrityProof (cryptosuite: ${credential.proof.cryptosuite}).`)
  }

  const isInRegistry = await registryCollections.issuerDid.isInRegistryCollection(issuerDid);
  if (!isInRegistry) {
    throw new Error(CredentialError.DidNotInRegistry);
  }

  try {
    const hasStatusProperty = extractCredentialsFrom(credential)?.find(vc => vc.credentialStatus);
    const result = await vc.verifyCredential({
      credential,
      suite,
      documentLoader,
      // Only check revocation status if VC has a 'credentialStatus' property
      checkStatus: hasStatusProperty ? checkStatus : undefined
    });

    // This logic catches the case where the verify response does not contain a `log` value
    if (result.results?.[0].log === undefined) {
      throw result.error || new Error('Verify response does not a `log` value');
    }

    if (!result.verified) {
      console.warn('VC not verified:', JSON.stringify(result, null, 2));
    }

    return result;
  } catch (err) {
    console.warn(err);
    console.log(JSON.stringify(err, removeStackReplacer, 2));

    throw new Error(CredentialError.CouldNotBeVerified);
  }
}

function removeStackReplacer(key: string, value: unknown) {
  return key === 'stack' ? '...' : value;
}
