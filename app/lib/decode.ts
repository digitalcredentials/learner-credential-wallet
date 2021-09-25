import { fromQrCode } from '@digitalcredentials/vpqr';

import { securityLoader } from './documentLoader';
import type { Credential } from '../types/credential';

const documentLoader = securityLoader().build();

export async function credentialsFromQrText(text: string): Promise<Credential[]> {
  const { vp } = await fromQrCode({ text, documentLoader });
  const { verifiableCredential } = vp;

  return [].concat(verifiableCredential);
}
