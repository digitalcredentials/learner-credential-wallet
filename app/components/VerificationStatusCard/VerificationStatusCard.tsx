import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import { theme } from '../../styles';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import styles from './VerificationStatusCard.styles';

const DATE_FORMAT = 'MMM D, YYYY';

enum LogId {
  ValidSignature = 'valid_signature',
  Expiration = 'expiration',
  IssuerDIDResolves = 'issuer_did_resolves',
  RevocationStatus = 'revocation_status'
}

export default function VerificationStatusCard({ credential, verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { expirationDate } = credential;
  console.log(verifyPayload);

  const details = verifyPayload.log.reduce<Record<string, boolean>>((acc, log) => {
    console.log(log);
    acc[log.id] = log.valid;
    return acc;
  }, {});

  console.log(details);

  const hasExpirationDate = expirationDate !== undefined;
  const expirationDateFmt = moment(expirationDate).format(DATE_FORMAT);
  const isExpired = moment() >= moment(expirationDate);

  const expirationText = hasExpirationDate
    ? isExpired
      ? `(expired on ${expirationDateFmt})`
      : `(expires on ${expirationDateFmt})`
    : '';

  function StatusItem({ text, verified }: StatusItemProps) {
    return (
      <View style={styles.statusItem}>
        <MaterialIcons
          name={verified ? 'check' : 'close'}
          size={theme.iconSize}
          color={verified ? theme.color.success : theme.color.error}
          accessibilityLabel={verified ?  'Verified, Icon' : 'Not Verified, Icon'}
        />
        <Text style={styles.bodyText}>{text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Status details:</Text>
      <StatusItem text="Has a valid digital signature" verified={details[LogId.ValidSignature]}/>
      <StatusItem text="Has been issued by a registered institution" verified={details[LogId.IssuerDIDResolves]} />
      <StatusItem text="Has not been revoked" verified={details[LogId.RevocationStatus]} />
      <StatusItem text={`Has not expired ${expirationText}`} verified={details[LogId.Expiration]} />
    </View>
  );
}
