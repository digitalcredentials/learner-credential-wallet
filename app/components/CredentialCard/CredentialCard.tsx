import React from 'react';
import moment from 'moment';
import { View, Text, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { CredentialRecordRaw } from '../../model/credential';
import { theme } from '../../styles';
import styles from './CredentialCard.styles';

const NO_URL = null;
const DATE_FORMAT = 'MMM D, YYYY';

type CredentialCardProps = {
  rawCredentialRecord: CredentialRecordRaw;
};

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const { credential } = rawCredentialRecord;
  const { credentialSubject, issuer, issuanceDate, expirationDate } = credential;

  let achievement = credential.credentialSubject.hasCredential ??
    credential.credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }

  const title = achievement?.name ?? '';
  const criteria = achievement?.criteria ?? {};

  const description = achievement?.description ?? '';
  const subjectName = credentialSubject.name;
  const numberOfCredits = achievement?.awardedOnCompletionOf?.numberOfCredits?.value ?? '';

  const issuanceDateFmt = moment(issuanceDate).format(DATE_FORMAT);
  const expirationDateFmt = expirationDate && moment(expirationDate).format(DATE_FORMAT);

  const { startDate, endDate } = achievement?.awardedOnCompletionOf ?? {};
  const startDateFmt = startDate && moment(startDate).format(DATE_FORMAT);
  const endDateFmt = endDate && moment(endDate).format(DATE_FORMAT);

  const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
  const issuerUrl = (typeof issuer === 'string' ? null : issuer?.url) ?? NO_URL;
  const issuerImage = typeof issuer === 'string' ? null : issuer?.image;
  const badgeImage = achievement?.image;
  const narrative = criteria?.narrative;

  function IssuerLink(): JSX.Element {
    if (issuerUrl === NO_URL) {
      return <Text style={styles.dataValue}>{issuerUrl}</Text>;
    }

    return (
      <Text
        style={styles.link}
        accessibilityRole="link"
        onPress={() => Linking.openURL(issuerUrl)}
      >
        {issuerUrl}
      </Text>
    );
  }

  return (
    <View style={styles.credentialContainer}>
      <View style={styles.dataContainer}>
        <Text style={styles.header} accessibilityRole="header">{title}</Text>
        <Text style={styles.dataLabel}>Issuer</Text>
        <View style={styles.flexRow}>
          {issuerImage ? (
            <Image
              source={{ uri: issuerImage }}
              style={styles.dataImage}
              accessible={true}
              accessibilityLabel={issuerName}
              accessibilityRole="image"
            />
          ) : (
            <View style={styles.dataImage}>
              <MaterialCommunityIcons
                name="certificate"
                size={styles.dataImage.width}
                color={theme.color.iconActive}
              />
            </View>
          )}
          {issuerName ? (
            <Text style={styles.dataValue}>{issuerName}</Text>
          ) : null}
        </View>
      </View>
      {issuerUrl ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Issuer Website</Text>
          <IssuerLink />
        </View>
      ) : null}
      <View style={styles.flexRow}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Issuance Date</Text>
          <Text style={styles.dataValue}>{issuanceDateFmt}</Text>
        </View>
        {expirationDate ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Expiration Date</Text>
            <Text style={styles.dataValue}>{expirationDateFmt}</Text>
          </View>
        ) : null}
      </View>
      {subjectName ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Subject Name</Text>
          <Text style={styles.dataValue}>{subjectName}</Text>
        </View>
      ) : null}
      {numberOfCredits ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Number of Credits</Text>
          <Text style={styles.dataValue}>{numberOfCredits}</Text>
        </View>
      ) : null}
      <View style={styles.flexRow}>
        {startDate ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Start Date</Text>
            <Text style={styles.dataValue}>{startDateFmt}</Text>
          </View>
        ) : null}
        {endDate ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>End Date</Text>
            <Text style={styles.dataValue}>{endDateFmt}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Description</Text>
        <Text style={styles.dataValue}>{description}</Text>
      </View>
      {narrative ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Criteria</Text>
          <Text style={styles.dataValue}>{narrative}</Text>
        </View>
      ) : null}
      {badgeImage ? (
        <Image
          source={{ uri: badgeImage }}
          style={styles.badgeImage}
          accessible={true}
          accessibilityLabel={'Achievement badge'}
          accessibilityRole="image"
        />
      ) : null}
    </View>
  );
}
