import React from 'react';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';


const credentialTypes = [
  (rawCredential) => {
    const { credential } = rawCredential;
    if (!!credential.type.includes('UniversityDegreeCredential')){
      return {
        component: UniversityDegreeCredentialCard,
        title: 'todo',
      };
    }
    return null;
  },
  (rawCredential) => {
    const { credential } = rawCredential;
    if(!!credential.type.includes('StudentId')){
      return {
        component: StudentIdCard,
        title: `${rawCredential.credential.credentialSubject.name} Student ID`,
      };
    }
    return null;
  },
  (rawCredential) => {
    return {
      component: DefaultCredentialCard,
      title: rawCredential.credential.credentialSubject.hasCredential?.name ?? '',
    };
  },
];

export function credentialRenderInfo(rawCredential){
  for (match of credentialTypes){
    let renderInfo = match(rawCredential);
    if (!!renderInfo){
        return renderInfo;
    }
  }
}

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  let DisplayComponent = credentialRenderInfo(rawCredentialRecord).component;
  return <DisplayComponent rawCredentialRecord={rawCredentialRecord} />;
}
