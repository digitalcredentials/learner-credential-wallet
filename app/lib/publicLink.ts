import moment from 'moment';
import { CredentialRecordRaw } from '../model';
import { IssuerObject } from '../types/credential';
import { Cache, CacheKey } from './cache';
import { credentialIdFor, educationalOperationalCredentialFrom } from './decode';
import { postCredentialToVerifierPlus } from './verifierPlus';

export async function createPublicLinkFor(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  const id = credentialIdFor(rawCredentialRecord);
  const url = await postCredentialToVerifierPlus(rawCredentialRecord);
  
  await Cache.getInstance().store(CacheKey.PublicLink, id, url);
  return url;
}

export async function removePublicLinkFor(rawCredentialRecord: CredentialRecordRaw): Promise<void> {
  const id = credentialIdFor(rawCredentialRecord);
  await Cache.getInstance().remove(CacheKey.PublicLink, id);
}

export async function getPublicLinkFor(rawCredentialRecord: CredentialRecordRaw): Promise<string | null> {
  const id = credentialIdFor(rawCredentialRecord);

  try {
    const url = await Cache.getInstance().load(CacheKey.PublicLink, id) as string;
    return url;
  } catch (err) {
    if ((err as Error).name === 'NotFoundError') return null;
    throw err;
  }
}

export async function hasPublicLink(rawCredentialRecord: CredentialRecordRaw): Promise<boolean> {
  const url = await getPublicLinkFor(rawCredentialRecord);
  return url !== null;
}

export async function linkedinUrlFrom(rawCredentialRecord: CredentialRecordRaw): Promise<string> {
  const publicLink = await getPublicLinkFor(rawCredentialRecord);
  const eoc = educationalOperationalCredentialFrom(rawCredentialRecord.credential.credentialSubject);
  
  if (!eoc) {
    throw new Error('No achievement/credential found, not sharing to LI.');
  }

  const issuer = rawCredentialRecord.credential.issuer as IssuerObject;
  const title = eoc?.name ?? 'Verifiable Credential';
  const issuanceDate = moment(rawCredentialRecord.credential.issuanceDate);
  const vcId = rawCredentialRecord.credential.id || eoc.id;
  const expirationDate = moment(rawCredentialRecord.credential.expirationDate);
  const hasExpirationDate = rawCredentialRecord.credential.expirationDate !== undefined;

  const organizationInfo = `&name=${title}&organizationName=${issuer.name}`;
  const issuance = `&issueYear=${issuanceDate.year()}&issueMonth=${issuanceDate.month()}`;
  const expiration = hasExpirationDate ? `&expirationYear=${expirationDate.year()}&expirationMonth=${expirationDate.month()}` : '';
  const certUrl = publicLink ? `&certUrl=${publicLink}` : '';
  const certId = vcId ? `&certId=${vcId}` : '';

  const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}${certId}`;

  return url;
}
