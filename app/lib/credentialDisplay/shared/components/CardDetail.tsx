import React from 'react';
import { Text, View } from 'react-native';
import { useDynamicStyles } from '../../../../hooks';
import { dynamicStyleSheet } from '..';

import Markdown from 'react-native-markdown-display';

type CredentialDetailProps = {
  label: string,
  value: string | null,
  isMarkdown?: boolean,
}

export default function CardDetail({ label, value, isMarkdown = false}: CredentialDetailProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);

  const markdownStyles = {
    paragraph: {
      ...styles.dataValue,
      marginBottom: 0,
      marginTop: 0,
    }
  };

  if (value === null) {
    return null;
  }

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.dataLabel}>{label}</Text>
      {isMarkdown ? 
        <Markdown style={markdownStyles}>{value}</Markdown> 
        : 
        <Text style={styles.dataValue}>{value}</Text>}
      
    </View>
  );
}
