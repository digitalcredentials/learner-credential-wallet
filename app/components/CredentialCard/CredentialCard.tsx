import React from 'react';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';


const credentialTypes = [
  {
    match: (rawCredential) => {
      const { credential } = rawCredential;
      return !!credential.type.includes('UniversityDegreeCredential');
    },
    component: UniversityDegreeCredentialCard,
    title: (rawCredential) => {
      return 'todo';
    }
  },
  {
    match: (rawCredential) => {
      const { credential } = rawCredential;
      return !!credential.type.includes('StudentId');
    },
    component: StudentIdCard,
    title: (rawCredential) => {
      return `${rawCredential.credential.credentialSubject.name} Student ID`;
    }
  },
  {
    match: (rawCredential) => true,
    component: DefaultCredentialCard,
    title: (rawCredential) => {
      return rawCredential.credential.credentialSubject.hasCredential?.name ?? '';
    }
  }

];

export function credentialRenderInfo(rawCredential){
  for (credType of credentialTypes){
    if (credType.match(rawCredential)){
        return credType;
    }
  }

  // NOTE: not ideal, since instance used for match isn't bound to returned dict, so a call to get a title would look like 
  // credentialRenderInfo(rawCredentialRecord).title(rawCredentialRecord);
  // having to pass rawCredentialRecord twice
}

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  let DisplayComponent = credentialRenderInfo(rawCredentialRecord).component;
  return <DisplayComponent rawCredentialRecord={rawCredentialRecord} />;
}
