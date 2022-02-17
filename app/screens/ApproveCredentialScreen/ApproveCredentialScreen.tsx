import React from 'react';
import { View, ScrollView } from 'react-native';

import { CredentialCard, VerificationCard } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';
import { usePendingCredential } from '../../hooks';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredentialId } = route.params;
  const pendingCredential = usePendingCredential(pendingCredentialId);
  const { credential } = pendingCredential;

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={CredentialRecord.rawFrom(credential)} />
          <VerificationCard credential={credential} isButton />
          <ApprovalControls pendingCredential={pendingCredential} />
        </View>
      </ScrollView>
    </>
  );
}
