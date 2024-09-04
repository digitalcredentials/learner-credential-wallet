import React from 'react';
import { ListItem } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import dynamicStyleSheet from './MenuItem.styles';
import type { MenuItemProps } from './MenuItem.d';
import { useDynamicStyles } from '../../hooks';

export default function MenuItem({ icon, title, onPress }: MenuItemProps): React.ReactElement {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);

  return (
    <ListItem
      containerStyle={styles.menuItemContainer}
      onPress={onPress}
    >
      { icon && (
        <MaterialIcons
          name={icon}
          size={theme.iconSize}
          color={theme.color.iconInactive}
        />
      )}
      <ListItem.Content>
        <ListItem.Title style={styles.menuItemTitle}>{title}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
}
