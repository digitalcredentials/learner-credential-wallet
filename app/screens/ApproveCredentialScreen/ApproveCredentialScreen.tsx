import React from 'react';
import { View, ScrollView } from 'react-native';

import { CredentialCard } from '../../components';
import { NavHeader } from '../../components';

import type { ApproveCredentialScreenProps } from './ApproveCredentialScreen.d';
import styles from './ApproveCredentialScreen.styles';

export default function ApproveCredentialScreen({ navigation, route }: ApproveCredentialScreenProps): JSX.Element {
  const { rawCredentialRecord } = route.params;

  return (
    <>
      <NavHeader title="Credential Preview" goBack={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.container}>
          <CredentialCard rawCredentialRecord={rawCredentialRecord} />
        </View>
      </ScrollView>
    </>
  );
}
