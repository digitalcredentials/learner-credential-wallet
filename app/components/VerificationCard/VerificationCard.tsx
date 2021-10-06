import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import type { Credential } from '../../types/credential';
import { useVerifyCredential } from '../../hooks';
import styles from './VerificationCard.styles';
import { theme } from '../../styles';

type VerificationCardProps = {
  credential: Credential;
}

export default function VerificationCard({ credential }: VerificationCardProps): JSX.Element {
  const { loading, verified } = useVerifyCredential(credential);

  if (loading) {
    return <Text>Verifying...</Text>;
  }

  if (verified) {
    return (
      <View style={[styles.flexRow, styles.proofContainer]}>
        <MaterialIcons
          name="check-circle"
          size={theme.iconSize}
          color={theme.color.success}
        />
        <Text style={[styles.dataValue, styles.proofText]}>
          Credential Verified
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.flexRow, styles.proofContainer]}>
      <MaterialCommunityIcons
        name="close-circle"
        size={theme.iconSize}
        color={theme.color.error}
      />
      <Text style={[styles.dataValue, styles.proofText]}>
        Invalid Credential
      </Text>
    </View>
  );
}
