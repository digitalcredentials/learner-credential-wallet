import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import styles from './VerificationCard.styles';
import { theme } from '../../styles';

type VerificationCardProps = {
  verified: boolean;
}

export default function VerificationCard({ verified }: VerificationCardProps): JSX.Element {
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
