import moment from 'moment';
import { Subject } from '../../../../types/credential';
import { DATE_FORMAT } from '../../../constants';
import { imageSourceFrom } from './image';

type CredentialRenderInfo = {
  subjectName: string | null;
  degreeName: string | null;

  title: string | null;
  description: string | null;
  criteria: string | null;
  startDateFmt: string | null;
  endDateFmt: string | null;
  numberOfCredits: string | null;
  achievementImage: string | null;
}

function educationalOperationalCredentialFrom(credentialSubject: Subject) {
  let data = credentialSubject.hasCredential || credentialSubject.achievement;
  if (Array.isArray(data)) {
    data = data[0];
  }

  return data;
}

export function credentialSubjectRenderInfoFrom(credentialSubject: Subject): CredentialRenderInfo {
  const subjectName = credentialSubject?.name ?? null;
  const degreeName = credentialSubject.degree?.name ?? null;

  const eoc = educationalOperationalCredentialFrom(credentialSubject);

  const title = eoc?.name ?? null;
  const description = eoc?.description ?? null;
  const criteria = eoc?.criteria?.narrative ?? null;

  const numberOfCredits = eoc?.awardedOnCompletionOf?.numberOfCredits?.value ?? null;

  const achievementImage = imageSourceFrom(eoc?.image);

  const { startDate, endDate } = eoc?.awardedOnCompletionOf || {};
  const startDateFmt = startDate ? moment(startDate).format(DATE_FORMAT) : null;
  const endDateFmt = endDate ? moment(endDate).format(DATE_FORMAT) : null;

  return {
    subjectName,
    degreeName,
    title,
    description,
    criteria,
    numberOfCredits,
    startDateFmt,
    endDateFmt,
    achievementImage,
  };
}
