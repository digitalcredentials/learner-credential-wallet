import { Credential } from '../types/credential';
import { VerifiablePresentation } from '../types/presentation';
import { verifyCredential, verifyPresentation } from './validate';

/**
 * This type is used to identify a request response that could be a
 * Verifiable Credential or Verifiable Presentation.
 */
export type VerifiableObject = Credential | VerifiablePresentation;

export function isVerifiableCredential(obj: VerifiableObject): obj is Credential {
  return obj.type?.includes('VerifiableCredential');
}

function isVerifiablePresentation(obj: VerifiableObject): obj is VerifiablePresentation {
  return obj.type.includes('VerifiablePresentation');
}

export async function verifyVerifiableObject(obj: VerifiableObject): Promise<boolean> {
  try {
    if (isVerifiableCredential(obj)) return (await verifyCredential(obj)).verified;
    if (isVerifiablePresentation(obj)) return (await verifyPresentation(obj)).verified;
  } catch (err) {
    console.warn(err);
  }

  return false;
}

export function extractCredentialsFrom(obj: VerifiableObject): Credential[] | null {
  if (isVerifiableCredential(obj)) {
    return [obj];
  }

  if (isVerifiablePresentation(obj)) {
    const { verifiableCredential } = obj;

    if (verifiableCredential instanceof Array) {
      return verifiableCredential;
    }
    return [verifiableCredential];
  }

  return null;
}
