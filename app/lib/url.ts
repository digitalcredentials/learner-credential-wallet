import moment from 'moment';
import { CredentialRecordRaw } from '../model';
import { IssuerObject } from '../types/credential';
import { Cache, CacheKey } from './cache';
import {StoreCredentialResult} from './verifierPlus';

export async function linkedinUrlFrom(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  if (rawCredentialRecord.credential.id === undefined) {
    throw new Error('Credential cannot be shared, `id` is not defined.');
  }

  const publicLinks = await Cache.getInstance()
    .load(CacheKey.PublicLinks, rawCredentialRecord.credential.id) as StoreCredentialResult;
  const publicViewLink = `${publicLinks.server}${publicLinks.url.view}`;

  let achievement = rawCredentialRecord.credential.credentialSubject.hasCredential ??
    rawCredentialRecord.credential.credentialSubject.achievement;

  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }

  if (!achievement) {
    throw new Error('No achievement/credential found, not sharing to LI.');
  }

  const issuer = rawCredentialRecord.credential.issuer as IssuerObject;
  const title = achievement?.name ?? 'Verifiable Credential';
  const issuanceDate = moment(rawCredentialRecord.credential.issuanceDate);
  const vcId = rawCredentialRecord.credential.id || achievement.id;
  const expirationDate = moment(rawCredentialRecord.credential.expirationDate);
  const hasExpirationDate = rawCredentialRecord.credential.expirationDate !== undefined;

  const organizationInfo = `&name=${title}&organizationName=${issuer.name}`;
  const issuance = `&issueYear=${issuanceDate.year()}&issueMonth=${issuanceDate.month()}`;
  const expiration = hasExpirationDate ? `&expirationYear=${expirationDate.year()}&expirationMonth=${expirationDate.month()}` : '';
  const certUrl = publicViewLink ? `&certUrl=${publicViewLink}` : '';
  const certId = vcId ? `&certId=${vcId}` : '';

  const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}${certId}`;

  return url;
}
