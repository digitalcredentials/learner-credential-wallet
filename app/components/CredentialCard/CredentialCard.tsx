import React from 'react';
import moment from 'moment';
import { View, Text, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { CredentialRecordRaw } from '../../model/credential';
import { theme } from '../../styles';
import styles from './CredentialCard.styles';

const NO_URL = 'None';
const DATE_FORMAT = 'MMM D, YYYY';

type CredentialCardProps = {
  rawCredentialRecord: CredentialRecordRaw;
};

export default function CredentialCard({ rawCredentialRecord }: CredentialCardProps): JSX.Element {
  const { credential } = rawCredentialRecord;
  const { credentialSubject, issuer, issuanceDate, expirationDate } = credential;

  const title = credentialSubject.hasCredential?.name ?? '';
  const description = credentialSubject.hasCredential?.description ?? '';
  const subjectName = credentialSubject.name;
  const numberOfCredits = credentialSubject.hasCredential?.awardedOnCompletionOf?.numberOfCredits?.value ?? '';

  const issuanceDateFmt = moment(issuanceDate).format(DATE_FORMAT);
  const expirationDateFmt = expirationDate && moment(expirationDate).format(DATE_FORMAT);

  const { startDate, endDate } = credentialSubject.hasCredential?.awardedOnCompletionOf ?? {};
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
