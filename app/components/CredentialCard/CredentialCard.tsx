import React from 'react';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  // Switch display type for credential based on credentialSubject > hasCredential > type
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;

  // Possible way to handle component + title
  // const credentialTypes = [
  //   {
  //     match: rawCredential => {
  //     },
  //     component: StudentIdCard,
  //     renderTitle: rawCredential => {
  //     }
  //   }
  // ];
  //
  //
  // for (credType of credentialTypes){
  //   if (credType.match(rawCredential)){
  //       return <credType.component rawCredential={rawCredential} />
  //       // or in CredentialItem:
  //       // return credType.renderTitle(rawCredential)
  //   }
  // }

  if ( credential.type.includes('UniversityDegreeCredential') ){
    return <UniversityDegreeCredentialCard rawCredentialRecord={rawCredentialRecord} />;
  }

  if (credential.type.includes('StudentId')){
    return <StudentIdCard rawCredentialRecord={rawCredentialRecord} />;
  }

  // maybe rename to generic credential card
  return <DefaultCredentialCard rawCredentialRecord={rawCredentialRecord} />;
}
