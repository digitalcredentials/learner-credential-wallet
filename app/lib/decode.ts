import { fromQrCode } from '@digitalcredentials/vpqr';

import { securityLoader } from './documentLoader';
import type { Credential } from '../types/credential';

const documentLoader = securityLoader().build();
const vpqrPattern = /^VP1-[A-Z|0-9]+/;

export async function credentialsFromQrText(text: string): Promise<Credential[]> {
  const { vp } = await fromQrCode({ text, documentLoader });
  const { verifiableCredential } = vp;

  return [].concat(verifiableCredential);
}

export function isVpqr(text: string): boolean {
  return vpqrPattern.test(text);
}
