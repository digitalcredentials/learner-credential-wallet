import React from 'react';
import { ScrollView, Text } from 'react-native';

import { NavHeader, VerificationCard, VerificationStatusCard } from '../../components';

import type { VerificationStatusScreenProps } from './VerificationStatusScreen.d';
import styles from './VerificationStatusScreen.styles';

export default function VerificationStatusScreen({
  navigation,
  route,
}: VerificationStatusScreenProps): JSX.Element {
  const { credential, verifyPayload } = route.params;

  return (
    <>
      <NavHeader
        title="Verification Status"
        goBack={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <VerificationCard verifyPayload={verifyPayload} />
        <VerificationStatusCard credential={credential} verifyPayload={verifyPayload} />
        <Text style={styles.footerText}>
          Please contact your issuing organization if you have any problems with
          the verification status.
        </Text>
      </ScrollView>
    </>
  );
}
