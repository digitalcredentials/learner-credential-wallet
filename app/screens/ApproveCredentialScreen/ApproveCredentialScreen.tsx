import React from 'react';
import { View, ScrollView } from 'react-native';

import { CredentialCard } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredential } = route.params;
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
