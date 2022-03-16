import React from 'react';
import { View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';

import { theme } from '../../styles';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import styles from './VerificationStatusCard.styles';

const DATE_FORMAT = 'MMM D, YYYY';

export default function VerificationStatusCard({ credential, verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { expirationDate } = credential;

  const hasExpirationDate = expirationDate !== undefined;
  const expirationDateFmt = moment(expirationDate).format(DATE_FORMAT);
  const isExpired = moment() >= moment(expirationDate);

  const expirationText = hasExpirationDate
    ? isExpired 
      ? `(expired on ${expirationDateFmt})` 
      : `(expires on ${expirationDateFmt})`
    : '';

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
        <StatusItem text="the digital signature validates" />
        <StatusItem text="has been issued by a registered institution" />
        <StatusItem text="the issuing institution could be reached to verify the credential" />
        <StatusItem text={`has not expired${expirationText}`} />
        <StatusItem text="has not been revoked by the issuing institution" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>This could mean that the credential:</Text>
      <StatusItem text="is in an unrecognized format" />
      <StatusItem text="the digital signature does not validate" />
      <StatusItem text="has not been issued by a registered institution" />
      <StatusItem text="the issuing institution could not be reached to verify the credential" />
      <StatusItem text={`has expired ${expirationText}`} />
      <StatusItem text="has been revoked by the issuing institution" />
    </View>
  );
}
