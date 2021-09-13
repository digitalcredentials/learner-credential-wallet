import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { theme } from '../../styles';
import styles from './ErrorDialog.styles';

export type ErrorDialogProps = {
  message: string;
}

export default function ErrorDialog({ message }: ErrorDialogProps): JSX.Element | null {
  if (message !== '') {
    return (
      <View style={styles.container}>
        <Ionicons name="warning" size={theme.iconSize} color={theme.color.backgroundSecondary} />
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  } else {
    return null;
  }
}
