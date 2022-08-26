import React from 'react';
import { View, ScrollView } from 'react-native';

import { ApprovalControls, CredentialCard, VerificationCard } from '../../components';
import { NavHeader } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';
import { usePendingCredential } from '../../hooks';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredentialId, profileRecordId } = route.params;
  const pendingCredential = usePendingCredential(pendingCredentialId);
  const { credential } = pendingCredential;

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={CredentialRecord.rawFrom({ credential, profileRecordId })} />
          <VerificationCard credential={credential} isButton />
          <ApprovalControls pendingCredential={pendingCredential} profileRecordId={profileRecordId} />
        </View>
      </ScrollView>
    </>
  );
}
