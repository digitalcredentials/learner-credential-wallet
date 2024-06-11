import { checkStatus } from '@digitalcredentials/vc-bitstring-status-list';
import { checkStatus as checkStatusLegacy } from '@digitalcredentials/vc-status-list';
import { Credential } from '../types/credential';

export enum StatusPurpose {
  Revocation = 'revocation',
  Suspension = 'suspension'
}

export function getCredentialStatusChecker(credential: Credential) {
  if (!credential.credentialStatus) {
    return null;
  }
  const credentialStatuses = Array.isArray(credential.credentialStatus) ?
    credential.credentialStatus :
    [credential.credentialStatus];
  const [credentialStatus] = credentialStatuses;
  switch (credentialStatus.type) {
  case 'BitstringStatusListEntry':
    return checkStatus;
  case 'StatusList2021Entry':
    return checkStatusLegacy;
  default:
    return null;
  }
}

export function hasStatusPurpose(
  credential: Credential,
  statusPurpose: StatusPurpose
) {
  if (!credential.credentialStatus) {
    return false;
  }
  const credentialStatuses = Array.isArray(credential.credentialStatus) ?
    credential.credentialStatus :
    [credential.credentialStatus];
  return credentialStatuses.some(s => s.statusPurpose === statusPurpose);
}
