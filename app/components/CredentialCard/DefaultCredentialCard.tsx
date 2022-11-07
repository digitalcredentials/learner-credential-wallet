import React from 'react';
import { View, Text, Image, Linking, ImageStyle, StyleProp } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import dynamicStyleSheet from './CredentialCard.styles';
import type { CredentialCardProps } from './CredentialCard.d';
import { CredentialStatusBadges } from '../';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDynamicStyles } from '../../hooks';
import { credentialDetailsFrom } from '../../lib/credentialDetails';

export default function DefaultCredentialCard({ rawCredentialRecord, onPressIssuer }: CredentialCardProps): JSX.Element {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const { credential } = rawCredentialRecord;

  const {
    title,
    description,
    formattedIssuanceDate,
    subjectName,
    numberOfCredits,
    criteria,
    startDateFmt,
    endDateFmt,
    issuerName,
    issuerUrl,
    issuerId,
    issuerImage
  } = credentialDetailsFrom(credential);
  

  function _onPressIssuer() {
    if (issuerId) {
      onPressIssuer(issuerId);
    }
  }

  function IssuerLink(): JSX.Element {
    if (issuerUrl === null) {
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
        <CredentialStatusBadges
          rawCredentialRecord={rawCredentialRecord}
          badgeBackgroundColor={theme.color.backgroundPrimary}
        />
        <Text style={styles.header} accessibilityRole="header">{title}</Text>
        <Text style={styles.dataLabel}>Issuer</Text>
        <View style={styles.flexRow}>
          {issuerImage ? (
            <Image
              source={{ uri: issuerImage }}
              style={styles.dataImage as StyleProp<ImageStyle>}
              accessible={true}
              accessibilityLabel={issuerName}
              accessibilityRole="image"
            />
          ) : (
            <View style={styles.dataImage}>
              <MaterialCommunityIcons
                name="certificate"
                size={theme.issuerIconSize}
                color={theme.color.iconActive}
              />
            </View>
          )}
          <View style={styles.spaceBetween}>
            <TouchableOpacity onPress={_onPressIssuer} disabled={!issuerId}>
              <View style={[styles.flexRow, styles.alignCenter]}>
                <Text style={styles.issuerValue}>{issuerName}</Text>
                {issuerId && <MaterialIcons name="info-outline" size={19} color={theme.color.textPrimary} style={styles.infoIcon} />}
              </View>
            </TouchableOpacity>
            <IssuerLink />
          </View>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Issuance Date</Text>
        <Text style={styles.dataValue}>{formattedIssuanceDate}</Text>
      </View>
      {subjectName && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Subject Name</Text>
          <Text style={styles.dataValue}>{subjectName}</Text>
        </View>
      )}
      {numberOfCredits ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Number of Credits</Text>
          <Text style={styles.dataValue}>{numberOfCredits}</Text>
        </View>
      ) : null}
      <View style={styles.flexRow}>
        {startDateFmt ? (
          <View style={styles.dataContainer}>
            <Text style={styles.dataLabel}>Start Date</Text>
            <Text style={styles.dataValue}>{startDateFmt}</Text>
          </View>
        ) : null}
        {endDateFmt ? (
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
      {criteria ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Criteria</Text>
          <Text style={styles.dataValue}>{criteria}</Text>
        </View>
      ) : null}
    </View>
  );
}
