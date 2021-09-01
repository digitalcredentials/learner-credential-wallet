import React from 'react';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import styles from './MenuItem.styles';
import type { MenuItemProps } from './MenuItem.d';

export default function MenuItem({ icon, title, onPress }: MenuItemProps): JSX.Element {
  return (
    <ListItem containerStyle={styles.menuItemContainer} onPress={onPress}>
      <MaterialIcons
        name={icon}
        size={theme.iconSize}
        color={theme.color.iconInactive}
      />
      <ListItem.Content>
        <ListItem.Title style={styles.menuItemTitle}>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
