import { fromQrCode, toQrCode } from '@digitalcredentials/vpqr';

import { securityLoader } from './documentLoader';
//import { verifyPresentation } from '../lib/validate';
import type { Credential } from '../types/credential';
//import { VerifiablePresentation, PresentationError } from '../types/presentation';
import { VerifiablePresentation } from '../types/presentation';

const documentLoader = securityLoader().build();
const vpqrPattern = /^VP1-[A-Z|0-9]+/;

export async function credentialsFromQrText(text: string): Promise<Credential[]> {
  const { vp }: { vp: VerifiablePresentation } = await fromQrCode({ text, documentLoader });

  // TODO: We need to separate verification of the presentation from the credentials inside.
  // https://www.pivotaltracker.com/story/show/179830339
  //const isVerified = await verifyPresentation(vp);

  //if (!isVerified) {
  //  throw new Error(PresentationError.IsNotVerified);
  //}

  const { verifiableCredential } = vp;

  return ([] as Credential[]).concat(verifiableCredential);
}

export function isVpqr(text: string): boolean {
  return vpqrPattern.test(text);
}

export async function toQr(vp: VerifiablePresentation): Promise<string> {
  const result = await toQrCode({ vp, documentLoader });
  return result.payload;
}
