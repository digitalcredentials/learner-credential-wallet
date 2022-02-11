import React from 'react';
import { View, Text } from 'react-native';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from './DefaultCredentialCard/DefaultCredentialCard';
import CustomCredentialCard from './CustomCredentialCard/CustomCredentialCard';
import UniversityDegreeCredentialCard from './UniversityDegreeCredentialCard/UniversityDegreeCredentialCard';

import type { CredentialCardProps } from './CredentialCard.d';

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  // Switch display type for credential based on credentialSubject > hasCredential > type
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;

  if ( credential.type.includes('UniversityDegreeCredential') ){
    return <UniversityDegreeCredentialCard rawCredentialRecord={rawCredentialRecord} />
  }

  // TODO check credential.type contains 'assertion'

  // Probably need to check that hasCredential and hasCredential.type is not null/undefined

  if (
    credentialSubject.hasCredential && credentialSubject.hasCredential.type &&
    credentialSubject.hasCredential.type.includes('ProgramCompletionCredential')){
    return CustomCredentialCard({rawCredentialRecord});
  }

  // maybe rename to generic credential card
  return (
    <DefaultCredentialCard rawCredentialRecord={rawCredentialRecord} />
  );
}
