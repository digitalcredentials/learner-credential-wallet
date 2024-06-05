import type { Subject } from '../types/credential';

export function extractNameFromOBV3Identifier (credentialSubject: Subject): string | null {
  if(!credentialSubject?.identifier) {
    return null;
  }

  let identifiers;
  if(!Array.isArray(credentialSubject.identifier)) {
    identifiers = [credentialSubject.identifier];
  } else {
    identifiers = credentialSubject.identifier;
  }

  const nameIdentifier = identifiers.find(i => i.identityType === 'name');
    
  return nameIdentifier?.identityHash || null;
}