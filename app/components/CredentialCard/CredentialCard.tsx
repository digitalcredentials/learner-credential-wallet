import React from 'react';
import { View, Text } from 'react-native';

import type { CredentialRecordRaw } from '../../model/credential';

import DefaultCredentialCard from '../DefaultCredentialCard/DefaultCredentialCard';
import CustomCredentialCard from '../CustomCredentialCard/CustomCredentialCard';

type CredentialCardProps = {
  rawCredentialRecord: CredentialRecordRaw;
};


export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  // Switch display type for credential based on credentialSubject > hasCredential > type
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;

  // Probably need to check that hasCredential and hasCredential.type is not null/undefined

  if (credentialSubject.hasCredential.type.indexOf('ProgramCompletionCredential') != -1){
    return CustomCredentialCard({rawCredentialRecord});
  }

  return (
    <DefaultCredentialCard rawCredentialRecord={rawCredentialRecord} />
  );
}
