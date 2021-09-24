import { fromQrCode } from '@digitalcredentials/vpqr';

import { securityLoader } from './documentLoader';
import type { CredentialRecordRaw } from '../model/credential';

const documentLoader = securityLoader().build();

export async function credentialsFromQrText(text: string): Promise<CredentialRecordRaw[]> {
  const { vp } = await fromQrCode({ text, documentLoader });
  const { verifiableCredential } = vp;

  return [].concat(verifiableCredential);
}
