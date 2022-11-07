import moment from 'moment';
import { Credential, IssuerImage } from '../types/credential';

type Nullable<T> = { [K in keyof T]: T[K] | null };

type OptionalDetails = Nullable<{
  issuerId: string;
  issuerImage: string;
  issuerUrl: string;
  subjectName: string;
  startDateFmt: string;
  endDateFmt: string;
}>

type CredentialDetails = OptionalDetails & {
  title: string;
  description: string;
  formattedIssuanceDate: string;
  numberOfCredits: string;
  criteria: string;
  issuerName: string;
};

const DATE_FORMAT = 'MMM D, YYYY';

function isImageObject(obj: unknown): obj is IssuerImage {
  const imageObject = obj as IssuerImage;
  return typeof imageObject === 'object' && 'id' in imageObject && 'type' in imageObject;
}

export function credentialDetailsFrom(credential: Credential): CredentialDetails {
  
  const { credentialSubject, issuer, issuanceDate } = credential;

  let achievement = credential.credentialSubject.hasCredential ??
    credential.credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }

  const title = achievement?.name ?? '';
  const description = achievement?.description ?? '';
  const formattedIssuanceDate = moment(issuanceDate).format(DATE_FORMAT);
  const subjectName = credentialSubject?.name ?? null;
  const numberOfCredits = achievement?.awardedOnCompletionOf?.numberOfCredits?.value ?? '';
  const criteria = achievement?.criteria?.narrative ?? '';

  const { startDate, endDate } = achievement?.awardedOnCompletionOf ?? {};
  const startDateFmt = startDate ? moment(startDate).format(DATE_FORMAT) : null;
  const endDateFmt = endDate ? moment(endDate).format(DATE_FORMAT) : null;

  const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
  const issuerUrl = (typeof issuer === 'string' ? null : issuer?.url) ?? null;
  const issuerId = typeof issuer === 'string' ? null : issuer?.id;

  let issuerImage = null;
  if(typeof issuer !== 'string') {
    if (isImageObject(issuer.image)) {
      issuerImage = issuer.image.id;
    } else if (typeof issuer.image === 'string') {
      issuerImage = issuer.image;
    }
  }

  return {
    title,
    description,
    formattedIssuanceDate,
    subjectName,
    numberOfCredits,
    criteria,
    startDateFmt,
    endDateFmt,
    issuerName,
    issuerUrl,
    issuerId,
    issuerImage
  };
}
