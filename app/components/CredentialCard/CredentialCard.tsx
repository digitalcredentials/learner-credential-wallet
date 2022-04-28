import React from 'react';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';
import type { CredentialRenderInfo } from './CredentialCard.d';

const credentialTypes = [
  (rawCredential : CredentialRecordRaw) => {
    const { credential } = rawCredential;
    if (credential.type.includes('UniversityDegreeCredential')){
      return {
        component: UniversityDegreeCredentialCard,
        title: 'todo',
      };
    }
    return null;
  },
  (rawCredential : CredentialRecordRaw) => {
    const { credential } = rawCredential;
    if(credential.type.includes('StudentId')){
      return {
        component: StudentIdCard,
        title: `${rawCredential.credential.credentialSubject.name} Student ID`,
      };
    }
    return null;
  },
  (rawCredential : CredentialRecordRaw) => {
    return {
      component: DefaultCredentialCard,
      title: rawCredential.credential.credentialSubject.hasCredential?.name ?? '',
    };
  },
];

export function credentialRenderInfo(rawCredential : CredentialRecordRaw) : CredentialRenderInfo{
  for (match of credentialTypes){
    const renderInfo = match(rawCredential);
    if (renderInfo){
      return renderInfo;
    }
  }
}

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const DisplayComponent = credentialRenderInfo(rawCredentialRecord).component;
  return <DisplayComponent rawCredentialRecord={rawCredentialRecord} />;
}
