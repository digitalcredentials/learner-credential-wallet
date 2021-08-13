import React from 'react';
import { Image, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import styles from './CredentialItem.style';
import type { CredentialItemProps } from './CredentialItem.d';

export default function CredentialItem({
  title,
  subtitle,
  image,
  onPress,
}: CredentialItemProps): JSX.Element {
  return (
    <ListItem
      containerStyle={styles.listItemContainer}
      style={styles.listItemOuterContainer}
      onPress={onPress}
    >
      <ListItem.Content style={styles.listItemContentContainer}>
        {image ? (
          <Image source={image} style={styles.listItemImage} />
        ) : (
          <View style={styles.listItemImage}>
            <MaterialCommunityIcons
              name="certificate"
              size={40}
              color={theme.color.iconActive}
            />
          </View>
        )}
        <View style={styles.listItemTextContainer}>
          <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            {subtitle}
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}
