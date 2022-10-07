import React from 'react';
import moment from 'moment';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useDynamicStyles, useVerifyCredential, VerifyPayload } from '../../hooks';
import dynamicStyleSheet from './VerificationCard.styles';
import { navigationRef } from '../../navigation';
import { CredentialRecordRaw } from '../../model';

type CommonProps = {
  isButton?: boolean;
  showDetails?: boolean
}

type VerifyProps =
  | { rawCredentialRecord: CredentialRecordRaw, verifyPayload?: never; }
  | { rawCredentialRecord?: never; verifyPayload: VerifyPayload; isButton?: never | false; };

type VerificationCardProps = CommonProps & VerifyProps;

const DATE_FORMAT = 'MMM D, YYYY';

/**
 * The VerificationCard is used to render the verification status of a
 * credential can be implemented in one of two ways:
 *   1) Pass in a `credential` to generate a `verifyPayload` and render the status.
 *   2) Pass in a `verifyPayload` to render the status (cannot be a button).
 */
export default function VerificationCard({ rawCredentialRecord, verifyPayload, isButton, showDetails = false }: VerificationCardProps): JSX.Element {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const generatedVerifyPayload = useVerifyCredential(rawCredentialRecord, true);
  const { credential } = rawCredentialRecord || {};

  if (generatedVerifyPayload !== null) {
    verifyPayload = generatedVerifyPayload;
  }

  if (verifyPayload === undefined) {
    throw new Error('The VerificationCard component was implemented incorrectly.');
  }

  const { loading, result: { verified, timestamp } } = verifyPayload;

  const lastCheckedDate = moment(timestamp).format(DATE_FORMAT);

  function goToStatus() {
    if (navigationRef.isReady() && verifyPayload !== undefined && credential !== undefined) {
      navigationRef.navigate('VerificationStatusScreen', { credential, verifyPayload });
    }
  }

  function VerificationContent(): JSX.Element {
    if (loading) {
      return (
        <View style={styles.flexRow}>
          <MaterialIcons
            name="pending"
            size={theme.iconSize}
            color={theme.color.iconInactive}
            accessibilityLabel="Pending, Icon"
          />
          <Text style={[styles.dataValue, styles.proofText]}>
            Verifying...
          </Text>
        </View>
      );
    }

    if (verified) {
      return (
        <View style={styles.flexRow}>
          <MaterialIcons
            name="check-circle"
            size={theme.iconSize}
            color={theme.color.success}
            accessibilityLabel="Verified, Icon"
          />
          <View>
            <Text style={[styles.dataValue, styles.proofText]}>
              Credential Verified
            </Text>
            {showDetails && (
              <Text style={[styles.dataValue, styles.proofText, styles.lastCheckedText]}>Last Checked: {lastCheckedDate}</Text>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={styles.flexRow}>
        <MaterialCommunityIcons
          name="close-circle"
          size={theme.iconSize}
          color={theme.color.error}
          accessibilityLabel="Invalid, Icon"
        />
        <View>
          <Text style={[styles.dataValue, styles.proofText]}>
            Invalid Credential
          </Text>
          {showDetails && (
            <Text style={[styles.dataValue, styles.proofText, styles.lastCheckedText]}>Last Checked: {lastCheckedDate}</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity disabled={loading || !isButton} onPress={goToStatus}>
      <View style={[styles.flexRow, styles.proofContainer]}>
        <VerificationContent/>
        {!loading && isButton &&
          <MaterialCommunityIcons
            name="chevron-right"
            size={theme.iconSize}
            color={theme.color.iconActive}
            accessibilityLabel="Chevron Right, Icon"
          />
        }
      </View>
    </TouchableOpacity>
  );
}
