import React, { ComponentProps, useMemo } from 'react';
import { View } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import dynamicStyleSheet from './CredentialItem.styles';
import type { CredentialItemProps } from './CredentialItem.d';
import { CredentialStatusBadges } from '../../components';
import { useDynamicStyles, useVerifyCredential } from '../../hooks';
import { credentialItemPropsFor } from '../../lib/credentialDisplay';
import { CardImage } from '../../lib/credentialDisplay/shared';

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
}: CredentialItemProps): React.ReactElement {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);

  const verifyCredential = useVerifyCredential(rawCredentialRecord);
  const isNotVerified = useMemo(() => verifyCredential?.result.verified === false, [verifyCredential]);

  const { title, subtitle, image } = credentialItemPropsFor(credential);

  /**
   * When the `bottomElement` param is provided, the root view must not be
   * accessible. This is to support screen reader accessibility for button
   * elements passed through the `bottomElement` param.
   */
  const hasBottomElement = bottomElement !== undefined;
  const accessibilityProps: ComponentProps<typeof View> = {
    accessibilityLabel: `${title} Credential, from ${subtitle}`,
    accessibilityRole: checkable ? 'checkbox' : 'button',
    accessibilityState: { checked: checkable ? selected : undefined },
  };

  function LeftContent(): React.ReactElement | null {
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
        <View style={styles.notVerifiedIcon}>
          <MaterialCommunityIcons
            name="close-circle"
            size={theme.issuerIconSize - 8}
            color={theme.color.error}
          />
        </View>
      );
    }

    return <CardImage source={image} accessibilityLabel={subtitle} size={theme.issuerIconSize - 8} />;
  }

  function StatusBadges(): React.ReactElement | null {
    if (!showStatusBadges || !rawCredentialRecord) return null;

    return (
      <CredentialStatusBadges
        rawCredentialRecord={rawCredentialRecord}
        badgeBackgroundColor={theme.color.backgroundPrimary}
      />
    );
  }

  function Chevron(): React.ReactElement | null {
    if (!chevron) return null;

    return (
      <ListItem.Chevron
        hasTVPreferredFocus={undefined}
        color={theme.color.textSecondary}
      />
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
          importantForAccessibility={hasBottomElement ? 'yes' : 'no-hide-descendants'}
          {...accessibilityProps}
        >
          <LeftContent />
          <View style={styles.listItemTextContainer}>
            <StatusBadges />
            <ListItem.Title style={styles.listItemTitle}>{title}</ListItem.Title>
            <ListItem.Subtitle style={styles.listItemSubtitle}>{subtitle}</ListItem.Subtitle>
          </View>
          <Chevron />
        </View>
        {bottomElement}
      </ListItem.Content>
    </ListItem>
  );
}
