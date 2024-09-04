import React from 'react';
import { View, Text, Image } from 'react-native';

import { useDynamicStyles } from '../../hooks';
import { CredentialCardProps, CredentialDisplayConfig } from '.';
import { credentialSubjectRenderInfoFrom, dynamicStyleSheet, issuerRenderInfoFrom } from './shared';

export const studentIdDisplayConfig: CredentialDisplayConfig = {
  credentialType: 'StudentId',
  cardComponent: StudentIdCard,
  itemPropsResolver: ({ credentialSubject, issuer }) => {
    const { subjectName } = credentialSubjectRenderInfoFrom(credentialSubject);
    const { issuerName, issuerImage } = issuerRenderInfoFrom(issuer);

    return {
      title: `${subjectName} Student ID`,
      subtitle: issuerName,
      image: issuerImage,
    };
  },
};

function StudentIdCard({ rawCredentialRecord }: CredentialCardProps) : React.ReactElement {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { credential } = rawCredentialRecord;
  const { credentialSubject } = credential;
  const { studentId } = credentialSubject;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.dataContainer}>
        <Text style={styles.header} accessibilityRole="header">Student ID</Text>
      </View>
      <Image
        source={{ uri: studentId?.image }}
        style={styles.fullWidthImage}
      />
    </View>
  );
}
