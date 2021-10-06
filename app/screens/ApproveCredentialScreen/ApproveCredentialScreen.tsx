import React from 'react';
import { View, ScrollView, Text } from 'react-native';

import { CredentialCard, VerificationCard } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';
import { usePendingCredential, useVerifyCredential } from '../../hooks';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredentialId } = route.params;
  const pendingCredential = usePendingCredential(pendingCredentialId);
  const { credential } = pendingCredential;
  const { loading, verified } = useVerifyCredential(credential);

  console.log({ loading, verified });

  function Verification(): JSX.Element {
    if (loading || verified === null) {
      return <Text>Verifying...</Text>;
    }

    return <VerificationCard verified={verified} />;
  }

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={CredentialRecord.rawFrom(credential)} />
          <Verification />
          <ApprovalControls pendingCredential={pendingCredential} />
        </View>
      </ScrollView>
    </>
  );
}
