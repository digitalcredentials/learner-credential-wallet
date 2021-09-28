import React from 'react';
import { useSelector } from 'react-redux';
import { View, ScrollView } from 'react-native';

import type { RootState } from '../../store';
import type { PendingCredential } from '../../store/slices/credentialFoyer';
import { CredentialCard } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredentialId } = route.params;
  const pendingCredentials = useSelector<RootState, PendingCredential[]>(
    ({ credentialFoyer }) => credentialFoyer.pendingCredentials,
  );

  const pendingCredential = pendingCredentials.find(({ id }) => id === pendingCredentialId);

  if (pendingCredential === undefined) {
    throw new Error(`Pending credential with id ${pendingCredentialId} does not exist.`);
  }

  const { credential } = pendingCredential;

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={CredentialRecord.rawFrom(credential)} />
          <ApprovalControls pendingCredential={pendingCredential} />
        </View>
      </ScrollView>
    </>
  );
}
