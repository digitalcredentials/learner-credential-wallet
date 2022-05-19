import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './CredentialCard.styles';
import studentIdStyles from './StudentIdCard.styles';
import type { CredentialCardProps } from './CredentialCard.d';


export default function UniversityDegreeCredentialCard({ rawCredentialRecord }: CredentialCardProps) : JSX.Element {
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;
  const { studentId } = credentialSubject;

  return (
    <View style={styles.credentialContainer}>

      <View style={styles.dataContainer}>
        <Text style={styles.header} accessibilityRole="header">Student ID</Text>
      </View>

      <Image 
        source={{ uri: studentId?.image }} 
        style={studentIdStyles.studentIdPhoto}
      /> 

    </View>
  );
}
