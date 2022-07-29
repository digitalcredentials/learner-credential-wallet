import React from 'react';

import type { Credential } from '../../types/credential';

import DefaultCredentialCard from './DefaultCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard';
import StudentIdCard from './StudentIdCard';

import type { CredentialCardProps } from './CredentialCard.d';
import type { CredentialRenderInfo } from './CredentialCard.d';


const credentialTypes = [
  (credential : Credential) => {
    if(credential.type.includes('StudentId')){
      return {
        component: StudentIdCard,
        title: `${credential.credentialSubject.name} Student ID`,
      };
    }
    return null;
  },
  (credential : Credential) => {
    if (credential.type.includes('UniversityDegreeCredential')){
      return {
        component: UniversityDegreeCredentialCard,
        title: `${credential.credentialSubject.degree?.name ?? ''}`,
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
  let achievement = credential.credentialSubject.hasCredential ??
    credential.credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }

  const title = achievement?.name ?? '';
  return {
    component: DefaultCredentialCard, title };
}

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const { credential } = rawCredentialRecord;
  const DisplayComponent = credentialRenderInfo(credential).component;
  return <DisplayComponent rawCredentialRecord={rawCredentialRecord} />;
}
