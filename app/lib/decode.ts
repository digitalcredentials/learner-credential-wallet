import { fromQrCode, toQrCode } from '@digitalcredentials/vpqr';
import qs from 'query-string';

import { securityLoader } from '@digitalcredentials/security-document-loader';
//import { verifyPresentation } from '../lib/validate';
import type { Credential } from '../types/credential';
//import { VerifiablePresentation, PresentationError } from '../types/presentation';
import { VerifiablePresentation } from '../types/presentation';
import { CredentialRequestParams } from './request';
import { isCredentialRequestParams } from './request';
import { HumanReadableError } from './error';
import { isVerifiableCredential } from './verifiableObject';

const documentLoader = securityLoader().build();
const vpqrPattern = /^VP1-[A-Z|0-9]+/;
const urlPattern = /^https?:\/\/.+/;

export function isVpqr(text: string): boolean {
  return vpqrPattern.test(text);
}

export function isUrl(text: string): boolean {
  return urlPattern.test(text);
}

export function isDeepLink(text: string): boolean {
  return text.startsWith('dccrequest://request?') || text.startsWith('org.dcconsortium://request?');
}

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

export function credentialRequestParamsFromQrText(text: string): CredentialRequestParams {
  const params = qs.parse(text.split('?')[1]);
  const isValid = isCredentialRequestParams(params);

  if (!isValid) {
    throw new HumanReadableError('The QR code contained an invalid deep link.');
  }

  return params as CredentialRequestParams;
}

export async function toQr(vp: VerifiablePresentation): Promise<string> {
  const result = await toQrCode({ vp, documentLoader });
  return result.payload;
}

export async function credentialsFrom(data: string): Promise<Credential[]> {
  const items = isVpqr(data) 
    ? await credentialsFromQrText(data)
    : [JSON.parse(data)];

  const credentials = items.filter(isVerifiableCredential);
  if (credentials.length === 0) {
    throw new Error('No credentials parsed from data');
  }

  return credentials;
}
