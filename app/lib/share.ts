import moment from 'moment';
import { Linking } from 'react-native';
import { CredentialRecordRaw } from '../model';
import { IssuerObject } from '../types/credential';
import { Cache, CacheKey } from './cache';

export async function shareToLinkedIn(rawCredentialRecord: CredentialRecordRaw): Promise<void> {
  const publicLink = await Cache.getInstance().load(CacheKey.PublicLink, rawCredentialRecord.credential.id) as string;

  let achievement = rawCredentialRecord.credential.credentialSubject.hasCredential ??
    rawCredentialRecord.credential.credentialSubject.achievement;

  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }
  
  if (!achievement) {
    console.log('No achievement/credential found, not sharing to LI.');
    return;
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
  const certUrl = publicLink ? `&certUrl=${publicLink}` : '';
  const certId = vcId ? `&certId=${vcId}` : '';

  const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME${organizationInfo}${issuance}${expiration}${certUrl}${certId}`;

  await Linking.canOpenURL(url);
  Linking.openURL(url);
}
