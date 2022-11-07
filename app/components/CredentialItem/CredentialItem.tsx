import React, { ComponentProps, useMemo } from 'react';
import { Image, ImageStyle, StyleProp, View } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import dynamicStyleSheet from './CredentialItem.styles';
import type { CredentialItemProps } from './CredentialItem.d';
import { CredentialStatusBadges } from '../../components';
import { useDynamicStyles, useVerifyCredential } from '../../hooks';
import { credentialDetailsFrom } from '../../lib/credentialDetails';

export default function CredentialItem({
  onSelect,
  checkable = false,
  selected = false,
  chevron = false,
  hideLeft = false,
  bottomElement,
  rawCredentialRecord,
  credential,
  showStatusBadges = false,
}: CredentialItemProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);

  const verifyCredential = useVerifyCredential(rawCredentialRecord);
  const isNotVerified = useMemo(() => verifyCredential?.result.verified === false, [verifyCredential]);

  const { title, issuerName, issuerImage } = credentialDetailsFrom(credential);

  /**
   * When the `bottomElement` param is provided, the root view must not be
   * accessible. This is to support screen reader accessibility for button
   * elements passed through the `bottomElement` param.
   */
  const hasBottomElement = bottomElement !== undefined;
  const accessibilityProps: ComponentProps<typeof View> = {
    accessibilityLabel: `${title} Credential, from ${issuerName}`,
    accessibilityRole: checkable ? 'checkbox' : 'button',
    accessibilityState: { checked: checkable ? selected : undefined },
  };

  function LeftContent(): JSX.Element | null {
    if (hideLeft) return null;

    if (checkable) {
      return (
        <CheckBox
          checked={selected}
          onPress={onSelect}
          checkedColor={theme.color.buttonPrimary}
          containerStyle={mixins.checkboxContainer}
          textStyle={mixins.checkboxText}
        />
      );
    }

    if (isNotVerified) {
      return (
        <View style={mixins.imageIcon}>
          <MaterialCommunityIcons
            name="close-circle"
            size={theme.issuerIconSize}
            color={theme.color.error}
          />
        </View>
      );
    }

    if (issuerImage) {
      return (
        <Image
          source={{ uri: issuerImage }}
          style={mixins.imageIcon as StyleProp<ImageStyle>}
        />
      );
    }

    return (
      <View style={mixins.imageIcon}>
        <MaterialCommunityIcons
          name="certificate"
          size={theme.issuerIconSize}
          color={theme.color.iconActive}
        />
      </View>
    );
  }

  return (
    <ListItem
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
      containerStyle={styles.listItemContainer}
      style={styles.listItemOuterContainer}
      onPress={onSelect}
      accessible={!hasBottomElement}
      importantForAccessibility={hasBottomElement ? 'no' : 'yes'}
      {...accessibilityProps}
    >
      <ListItem.Content style={styles.listItemContentContainer}>
        <View
          style={styles.listItemTopContent}
          accessible={hasBottomElement}
          importantForAccessibility={
            hasBottomElement ? 'yes' : 'no-hide-descendants'
          }
          {...accessibilityProps}
        >
          <LeftContent />
          <View style={styles.listItemTextContainer}>
            {showStatusBadges && rawCredentialRecord && (
              <CredentialStatusBadges 
                rawCredentialRecord={rawCredentialRecord} 
                badgeBackgroundColor={theme.color.backgroundPrimary} />
            )}
            <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
            <ListItem.Subtitle style={styles.listItemSubtitle}>
              {issuerName}
            </ListItem.Subtitle>
          </View>
          {chevron && (
            <ListItem.Chevron
              hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}
            />
          )}
        </View>
        {bottomElement}
      </ListItem.Content>
    </ListItem>
  );
}
