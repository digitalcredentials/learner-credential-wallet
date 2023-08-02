import React from 'react';
import { Text, View } from 'react-native';
import { useDynamicStyles, useThemeContext } from '../../../../hooks';
import { dynamicStyleSheet } from '..';

import Markdown from 'react-native-markdown-display';

type CredentialDetailProps = {
  label: string,
  value: string | null,
  isMarkdown?: boolean,
}

export default function CardDetail({ label, value, isMarkdown = false}: CredentialDetailProps): JSX.Element | null {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { isDarkTheme } = useThemeContext();

  const markdownStyles = {
    paragraph: {
      fontSize: styles.dataValue.fontSize,
      color: styles.dataValue.color,
      flex: 1,
      marginBottom: 0,
      marginTop: 0,
    },
    bullet_list: {
      color: isDarkTheme ? '#ffffff' : '#000000'
    },
    ordered_list: {
      color: isDarkTheme ? '#ffffff' : '#000000'
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
