import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { theme } from '../../styles';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import styles from './VerificationStatusCard.styles';

export default function VerificationStatusCard({ verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { verified } = verifyPayload;

  function StatusItem({ text }: StatusItemProps) {
    return (
      <View style={styles.statusItem}>
        <Entypo
          name="dot-single"
          size={theme.iconSize}
          color={theme.color.iconInactive}
          style={styles.bulletContainer}
          accessibilityLabel="Bullet Point"
        />
        <Text style={styles.bodyText}>{text}</Text>
      </View>
    );
  }

  if (verified) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>This means that the credential:</Text>
        <StatusItem text="is in a recognized format" />
        <StatusItem text="the digital signature does validate (aka has not been tampered with)" />
        <StatusItem text="has been issued by a registered institution" />
        <StatusItem text="the issuing institution could be reached to verify the credential" />
        <StatusItem text="has not expired" />
        <StatusItem text="has not been revoked by the issuing institution" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>This could mean that the credential:</Text>
      <StatusItem text="is in an unrecognized format" />
      <StatusItem text="the digital signature does not validate (aka has been tampered with)" />
      <StatusItem text="has not been issued by a registered institution" />
      <StatusItem text="the issuing institution could not be reached to verify the credential" />
      <StatusItem text="has expired" />
      <StatusItem text="has been revoked by the issuing institution" />
    </View>
  );
}
