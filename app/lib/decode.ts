import { fromQrCode } from '@digitalcredentials/vpqr';

import { securityLoader } from './documentLoader';
import { verifyPresentation } from '../lib/validate';
import type { Credential } from '../types/credential';
import { VerifiablePresentation, PresentationError } from '../types/presentation';

const documentLoader = securityLoader().build();
const vpqrPattern = /^VP1-[A-Z|0-9]+/;

export async function credentialsFromQrText(text: string): Promise<Credential[]> {
  const { vp }: { vp: VerifiablePresentation } = await fromQrCode({ text, documentLoader });

  const isVerified = await verifyPresentation(vp);

  if (!isVerified) {
    throw new Error(PresentationError.IsNotVerified);
  }

  const { verifiableCredential } = vp;

  return ([] as Credential[]).concat(verifiableCredential);
}

export function isVpqr(text: string): boolean {
  return vpqrPattern.test(text);
}
