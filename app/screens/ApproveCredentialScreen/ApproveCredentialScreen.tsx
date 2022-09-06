import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';

import { CredentialCard, VerificationCard } from '../../components';
import { NavHeader } from '../../components';
import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';
import { usePendingCredential } from '../../hooks';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { pendingCredentialId, profileRecordId } = route.params;
  const pendingCredential = usePendingCredential(pendingCredentialId);
  const { credential } = pendingCredential;
  const rawCredentialRecord = useMemo(() => CredentialRecord.rawFrom({ credential, profileRecordId }), [credential]);

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={rawCredentialRecord} />
          <VerificationCard rawCredentialRecord={rawCredentialRecord} isButton />
        </View>
      </ScrollView>
    </>
  );
}
