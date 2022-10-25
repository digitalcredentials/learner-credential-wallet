import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import dynamicStyleSheet from './VerificationStatusCard.styles';
import { useDynamicStyles } from '../../hooks';

const DATE_FORMAT = 'MMM D, YYYY';

enum LogId {
  ValidSignature = 'valid_signature',
  Expiration = 'expiration',
  IssuerDIDResolves = 'issuer_did_resolves',
  RevocationStatus = 'revocation_status'
}

export default function VerificationStatusCard({ credential, verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const { expirationDate } = credential;

  const details = verifyPayload.result.log?.reduce<Record<string, boolean>>((acc, log) => {
    acc[log.id] = log.valid;
    return acc;
  }, {}) || {};

  const hasExpirationDate = expirationDate !== undefined;
  const expirationDateFmt = moment(expirationDate).format(DATE_FORMAT);
  const isExpired = moment() >= moment(expirationDate);

  const expirationText = hasExpirationDate
    ? isExpired
      ? `(expired on ${expirationDateFmt})`
      : `(expires on ${expirationDateFmt})`
    : '';

  function StatusItem({ positiveText, negativeText, verified = true }: StatusItemProps) {
    return (
      <View style={styles.statusItem}>
        <MaterialIcons
          name={verified ? 'check' : 'close'}
          size={theme.iconSize}
          color={verified ? theme.color.success : theme.color.error}
          accessibilityLabel={verified ?  'Verified, Icon' : 'Not Verified, Icon'}
        />
        <Text style={styles.bulletText}>{verified ? positiveText : negativeText}</Text>
      </View>
    );
  }

  if (verifyPayload.error) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Verification error:</Text>
        <Text style={styles.bodyText}>
          {verifyPayload.error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Status details:</Text>
      <StatusItem
        positiveText="Has a valid digital signature"
        negativeText="Has an invalid digital signature"
        verified={details[LogId.ValidSignature]}
      />
      <StatusItem
        positiveText="Has been issued by a registered institution"
        negativeText="Has not been issued by a registered institution"
        verified={details[LogId.IssuerDIDResolves]}
      />
      <StatusItem
        positiveText="Has not been revoked"
        negativeText="Has been revoked"
        verified={details[LogId.RevocationStatus]}
      />
      <StatusItem
        positiveText={`Has not expired ${expirationText}`}
        negativeText={`Has expired ${expirationText}`}
        verified={details[LogId.Expiration]}
      />
    </View>
  );
}
