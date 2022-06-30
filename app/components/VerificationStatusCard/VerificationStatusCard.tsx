import React from 'react';
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';

import { theme } from '../../styles';

import { VerificationStatusCardProps, StatusItemProps } from './VerificationStatusCard.d';
import styles from './VerificationStatusCard.styles';
import type { VerifyPayload } from '../../hooks';
import { ResultLog } from '../../lib/validate';

const DATE_FORMAT = 'MMM D, YYYY';

enum LogId {
  ValidSignature = 'valid_signature',
  Expiration = 'expiration',
  IssuerDIDResolves = 'issuer_did_resolves',
  RevocationStatus = 'revocation_status'
}

// stubs out result of granular verification until fully implemented
function DEV__decoratePayload(payload: VerifyPayload): VerifyPayload {
  return {
    ...payload,
    log: [
      { id: 'valid_signature', verified: false },
      { id: 'expiration', verified: true },
      { id: 'issuer_did_resolves', verified: false },
      { id: 'revocation_status', verified: true },
    ]
  };
}

export default function VerificationStatusCard({ credential, verifyPayload }: VerificationStatusCardProps): JSX.Element {
  const { expirationDate } = credential;

  // TODO: remove when verification implementation finished
  verifyPayload = DEV__decoratePayload(verifyPayload);

  const details = verifyPayload.log.reduce<Record<string, ResultLog>>((acc, log) => {
    acc[log.id] = log;
    return acc;
  }, {});

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
      <StatusItem text="Has a valid digital signature" verified={details[LogId.ValidSignature].verified}/>
      <StatusItem text="Has been issued by a registered institution" verified={details[LogId.IssuerDIDResolves].verified} />
      <StatusItem text="Has not been revoked" verified={details[LogId.RevocationStatus].verified} />
      <StatusItem text={`Has not expired ${expirationText}`} verified={details[LogId.Expiration].verified} />
    </View>
  );
}
