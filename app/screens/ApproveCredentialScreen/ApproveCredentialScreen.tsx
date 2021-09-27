import React from 'react';
import { useDispatch } from 'react-redux';
import { View, ScrollView } from 'react-native';

import type { Credential } from '../../types/credential';
import { getAllCredentials } from '../../store/slices/wallet';
import { CredentialCard } from '../../components';
import { NavHeader, ApprovalControls } from '../../components';

import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import { CredentialRecord } from '../../model';
import styles from './ApproveCredentialScreen.styles';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const { credential } = route.params;

  async function add(credential: Credential): Promise<void> {
    await CredentialRecord.addCredential(CredentialRecord.rawFrom(credential));
    dispatch(getAllCredentials());
  }

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={CredentialRecord.rawFrom(credential)} />
          <ApprovalControls add={() => add(credential)} />
        </View>
      </ScrollView>
    </>
  );
}
