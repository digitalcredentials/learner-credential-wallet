import { CredentialRecordRaw } from '../model';
import { IssuerObject } from '../types/credential';
import { Cache, CacheKey } from './cache';
import { getExpirationDate, getIssuanceDate } from './credentialValidityPeriod';
import { credentialIdFor, educationalOperationalCredentialFrom } from './decode';
import * as verifierPlus from './verifierPlus';
import { StoreCredentialResult } from './verifierPlus';

export async function createPublicLinkFor(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  const id = credentialIdFor(rawCredentialRecord);
  const links = await verifierPlus.postCredential(rawCredentialRecord);

  // store links in cache for future use (for copying and pasting it to share, for un-sharing)
  await Cache.getInstance().store(CacheKey.PublicLinks, id, links);
  return `${links.server}${links.url.view}`;
}

export async function unshareCredential(rawCredentialRecord: CredentialRecordRaw): Promise<void> {
  const vcId = credentialIdFor(rawCredentialRecord);

  const publicLinks = await Cache.getInstance()
    .load(CacheKey.PublicLinks, vcId) as StoreCredentialResult;
  const unshareUrl = `${publicLinks.server}${publicLinks.url.unshare}`;

  await Cache.getInstance().remove(CacheKey.PublicLinks, vcId);

  await verifierPlus.deleteCredential(rawCredentialRecord, unshareUrl);
}

export async function getPublicViewLink(rawCredentialRecord: CredentialRecordRaw): Promise<string | null> {
  const id = credentialIdFor(rawCredentialRecord);

  try {
    const publicLinks = await Cache.getInstance()
      .load(CacheKey.PublicLinks, id) as StoreCredentialResult;
    return `${publicLinks.server}${publicLinks.url.view}`;
  } catch (err) {
    if ((err as Error).name === 'NotFoundError') return null;
    throw err;
  }
}

export async function hasPublicLink(rawCredentialRecord: CredentialRecordRaw): Promise<boolean> {
  const url = await getPublicViewLink(rawCredentialRecord);
  return url !== null;
}

export async function linkedinUrlFrom(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  const publicLink = await getPublicViewLink(rawCredentialRecord);
  const eoc = educationalOperationalCredentialFrom(rawCredentialRecord.credential.credentialSubject);

  if (!eoc) {
    throw new Error('No achievement/credential found, not sharing to LI.');
  }

  const issuer = rawCredentialRecord.credential.issuer as IssuerObject;
  const title = eoc?.name ?? 'Verifiable Credential';
  const issuanceDateString = getIssuanceDate(rawCredentialRecord.credential);
  const hasIssuanceDate = issuanceDateString !== undefined;
  const issuanceDate = hasIssuanceDate && new Date(issuanceDateString);
  const expirationDateString = getExpirationDate(rawCredentialRecord.credential);
  const hasExpirationDate = expirationDateString !== undefined;
  const expirationDate = hasExpirationDate && new Date(expirationDateString);
  const organizationInfo = `&name=${title}&organizationName=${issuer.name}`;
  const issuance = issuanceDate ? `&issueYear=${issuanceDate.getFullYear()}` +
    `&issueMonth=${new Date(issuanceDate).getMonth() + 1}` : '';
  const expiration = expirationDate ? `&expirationYear=${expirationDate.getFullYear()}` +
    `&expirationMonth=${new Date(expirationDate).getMonth() + 1}` : '';
  const certUrl = publicLink ? `&certUrl=${publicLink}` : '';

  const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}`;

  return url;
}
