import {RegistryClient} from '@digitalcredentials/issuer-registry-client';
import {isVerifiableCredential, isVerifiablePresentation, VerifiableObject} from './verifiableObject';
import {verifyCredential, verifyPresentation} from './verifyCredentials';

export async function verifyVerifiableObject(
  obj: VerifiableObject, registries: RegistryClient
): Promise<boolean> {
  try {
    if (isVerifiableCredential(obj)) {
      return (await verifyCredential(obj, registries)).verified;
    }
    if (isVerifiablePresentation(obj)) {
      return (await verifyPresentation(obj)).verified;
    }
  } catch (err) {
    console.warn('Error while verifying:', err);
  }

  return false;
}
