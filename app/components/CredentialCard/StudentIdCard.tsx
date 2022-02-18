import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CredentialCard.styles';
import studentIdStyles from './StudentIdCard.styles';
import type { CredentialCardProps } from './CredentialCard.d';


export default function UniversityDegreeCredentialCard({ rawCredentialRecord }: CredentialCardProps) : JSX.Element {
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;
  const { issuer } = credential;

  return (
    <View style={styles.credentialContainer}>

      <View style={styles.dataContainer}>
        <Text style={styles.header} accessibilityRole="header">Student ID</Text>
      </View>

      <Image 
        source={{ uri: credentialSubject.image }} 
        style={studentIdStyles.studentPhoto}
      /> 

      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Issuer</Text>
        <View style={styles.flexRow}>
            <Image
              source={{ uri: issuer.image }}
              style={styles.dataImage}
              accessible={true}
              accessibilityLabel={issuer.name}
              accessibilityRole="image"
            />
          <Text style={styles.dataValue}>{issuer.name}</Text>
        </View>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Student name</Text>
        <Text style={styles.dataValue}>{credentialSubject.name}</Text>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.dataLabel}>Student number</Text>
        <Text style={styles.dataValue}>{credentialSubject.studentId.id}</Text>
      </View>

      <View style={studentIdStyles.barcodeContainer}>
      <Image 
        source={{ uri: credentialSubject.studentId.barcode }} 
        style={studentIdStyles.barcode}
      /> 
      </View>

    </View>
  )
}
