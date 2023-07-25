import React from 'react';
import { Text, View } from 'react-native';
import { useDynamicStyles } from '../../../../hooks';
import { dynamicStyleSheet } from '..';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

type CredentialDetailProps = {
  label: string,
  value: string | null,
  isHTML: boolean,
}

export default function CardDetail({ label, value, isHTML = false }: CredentialDetailProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { width } = useWindowDimensions();

  if (value === null) {
    return null;
  }

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataLabel}>{label}</Text>
      {/* <Text style={styles.dataValue}>{value}</Text> */}
      {isHTML ? <RenderHtml baseStyle={styles.dataValue} contentWidth={width} source={{ html: value }} /> : <Text style={styles.dataValue}>{value}</Text>}
    </View>
  );
}
