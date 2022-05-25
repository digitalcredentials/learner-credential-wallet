import React from 'react';
import moment from 'moment';
import { View, Text, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../../styles';
import styles from './CredentialCard.styles';
import type { CredentialCardProps } from './CredentialCard.d';

const NO_URL = 'None';
const DATE_FORMAT = 'MMM D, YYYY';


export default function DefaultCredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const { credential } = rawCredentialRecord;
  const { credentialSubject, issuer, issuanceDate } = credential;

  let achievement = credential.credentialSubject.hasCredential ??
    credential.credentialSubject.achievement;
  if (Array.isArray(achievement)) {
    achievement = achievement[0];
  }

  const title = achievement?.name ?? '';
  const description = achievement?.description ?? '';
  const formattedIssuanceDate = moment(issuanceDate).format(DATE_FORMAT);
  const subjectName = credentialSubject.name;
  const numberOfCredits = achievement?.awardedOnCompletionOf?.numberOfCredits?.value ?? '';

  const { startDate, endDate } = achievement?.awardedOnCompletionOf ?? {};
  const startDateFmt = startDate && moment(startDate).format(DATE_FORMAT);
  const endDateFmt = endDate && moment(endDate).format(DATE_FORMAT);

  const issuerName = (typeof issuer === 'string' ? issuer : issuer?.name) ?? '';
  const issuerUrl = (typeof issuer === 'string' ? null : issuer?.url) ?? NO_URL;
  const issuerImage = typeof issuer === 'string' ? null : issuer?.image;

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
          <Text style={styles.dataValue}>{issuerName}</Text>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Issuer Website</Text>
        <IssuerLink />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Issuance Date</Text>
        <Text style={styles.dataValue}>{formattedIssuanceDate}</Text>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Subject Name</Text>
        <Text style={styles.dataValue}>{subjectName}</Text>
      </View>
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
    </View>
  );
}
