import React from 'react';
import { Text, View } from 'react-native';
import { useDynamicStyles } from '../../../../hooks';
import { dynamicStyleSheet } from '..';

type CredentialDetailProps = {
  label: string,
  value: string | null,
}

export default function CardDetail({ label, value }: CredentialDetailProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);

  if (value === null) {
    return null;
  }

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataLabel}>{label}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );
}
