import React from 'react';

import type { Credential } from '../../types/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';
import type { CredentialRenderInfo } from './CredentialCard.d';

const credentialTypes = [
  (credential : Credential) => {
    if (credential.type.includes('UniversityDegreeCredential')){
      return {
        component: UniversityDegreeCredentialCard,
        title: 'todo',
      };
    }
    return null;
  },
  (credential : Credential) => {
    if(credential.type.includes('StudentId')){
      return {
        component: StudentIdCard,
        title: `${credential.credentialSubject.name} Student ID`,
      };
    }
    return null;
  },
];

export function credentialRenderInfo(credential : Credential) : CredentialRenderInfo {
  for (const match of credentialTypes){
    const renderInfo = match(credential);
    if (renderInfo){
      return renderInfo;
    }
  }
  return { component: DefaultCredentialCard, title: credential.credentialSubject.hasCredential?.name ?? '' };
}

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const { credential } = rawCredentialRecord;
  const DisplayComponent = credentialRenderInfo(credential).component;
  return <DisplayComponent rawCredentialRecord={rawCredentialRecord} />;
}
