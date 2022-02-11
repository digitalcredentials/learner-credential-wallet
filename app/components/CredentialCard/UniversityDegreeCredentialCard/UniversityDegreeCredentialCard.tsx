import React from 'react';
import { View, Text } from 'react-native';
import styles from '../CredentialCard.styles';
import type { CredentialCardProps } from '../CredentialCard.d';


export default function UniversityDegreeCredentialCard({ rawCredentialRecord }: CredentialCardProps) : JSX.Element {
  return (
    <View style={styles.credentialContainer}>
      <View style={styles.dataContainer}>
        <Text style={styles.header} accessibilityRole="header">University degree</Text>
      </View>
    </View>
  )
}
