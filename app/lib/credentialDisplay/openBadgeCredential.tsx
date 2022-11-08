import moment from 'moment';
import React from 'react';
import { View, Text } from 'react-native';

import { CredentialStatusBadges } from '../../components';
import { useDynamicStyles } from '../../hooks';
import { DATE_FORMAT } from '../constants';
import type { CredentialCardProps, CredentialDisplayConfig } from '.';
import { CardLink, CardDetail, dynamicStyleSheet, IssuerInfoButton, CardImage, issuerRenderInfoFrom, credentialSubjectRenderInfoFrom } from './shared';

export const openBadgeCredentialDisplayConfig: CredentialDisplayConfig = {
  credentialType: 'OpenBadgeCredential',
  cardComponent: OpenBadgeCredentialCard,
  itemPropsResolver: ({ credentialSubject, issuer }) => {
    const { title, achievementImage } = credentialSubjectRenderInfoFrom(credentialSubject);
    const { issuerName, issuerImage } = issuerRenderInfoFrom(issuer);

    return {
      title,
      subtitle: issuerName,
      image: achievementImage || issuerImage,
    };
  }
};

function OpenBadgeCredentialCard({ rawCredentialRecord, onPressIssuer }: CredentialCardProps): JSX.Element {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const { credential } = rawCredentialRecord;
  const { credentialSubject, issuer, issuanceDate } = credential;

  const formattedIssuanceDate = moment(issuanceDate).format(DATE_FORMAT);

  const { 
    title,
    description,
    criteria,
    subjectName,
    numberOfCredits,
    startDateFmt,
    endDateFmt,
    achievementImage
  } = credentialSubjectRenderInfoFrom(credentialSubject);

  const {
    issuerName,
    issuerUrl,
    issuerId,
    issuerImage,
  } = issuerRenderInfoFrom(issuer);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
        <CredentialStatusBadges
          rawCredentialRecord={rawCredentialRecord}
          badgeBackgroundColor={theme.color.backgroundPrimary}
        />
        <View style={[styles.flexRow, styles.dataContainer]}>
          {achievementImage && <CardImage source={achievementImage} accessibilityLabel={issuerName} />}
          <Text style={styles.header} accessibilityRole="header">{title}</Text>
        </View>
        <Text style={styles.dataLabel}>Issuer</Text>
        <View style={styles.flexRow}>
          <CardImage source={issuerImage} accessibilityLabel={issuerName} />
          <View style={styles.spaceBetween}>
            <IssuerInfoButton issuerId={issuerId} issuerName={issuerName} onPress={onPressIssuer} />
            <CardLink url={issuerUrl} />
          </View>
        </View>
      </View>
      <CardDetail label="Issuance Date" value={formattedIssuanceDate} />
      <CardDetail label="Subject Name" value={subjectName} />
      <CardDetail label="Subject Name" value={subjectName} />
      <CardDetail label="Number of Credits" value={numberOfCredits} />
      <View style={styles.flexRow}>
        <CardDetail label="Start Date" value={startDateFmt} />
        <CardDetail label="End Date" value={endDateFmt} />
      </View>
      <CardDetail label="Description" value={description} />
      <CardDetail label="Criteria" value={criteria} />
    </View>
  );
}
