import React from 'react';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import styles from './MenuItem.style';

export interface MenuItemProps {
  icon: 'share' | 'bug-report' | 'delete'; // TODO: Find MaterialIcons name prop type
  title: string;
  onPress: () => void;
}

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