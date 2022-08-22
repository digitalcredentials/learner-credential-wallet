import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { StatusBadgeProps } from './StatusBadge.d';
import styles from './StatusBadge.styles';

export default function StatusBadge({ label, color, icon, backgroundColor }: StatusBadgeProps): JSX.Element {
  const containerStyle = { backgroundColor };
  const labelStyle = { color };

  return (
    <View style={[styles.container, containerStyle]}>
      {icon && <MaterialIcons name={icon} color={color} style={styles.icon} size={16} />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
}
