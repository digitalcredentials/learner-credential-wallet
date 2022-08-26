import React, { Children, cloneElement, ElementType, isValidElement, ReactElement, ReactNode, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import OutsidePressHandler from 'react-native-outside-press';

import styles from './MoreMenuButton.styles';
import { mixins } from '../../styles';
import { AccessibleView } from '..';
import { View } from 'react-native';

type MoreMenuButtonProps = {
  children: ReactNode;
}

export default function MoreMenuButton({ children }: MoreMenuButtonProps): JSX.Element {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function onPressButton() {
    setMenuIsOpen(!menuIsOpen);
  }

  function closeMenu() {
    setMenuIsOpen(false);
  }

  const mappedChildren = Children.map(children, (child) => {
    if (isValidElement(child) && hasOnPressProp(child)) {
      const { onPress, ...restProps } = child.props;

      return cloneElement(child, {
        ...restProps,
        onPress: () => {
          closeMenu();
          onPress();
        },
      });
    }

    return child;
  });

  return (
    <View>
      <OutsidePressHandler onOutsidePress={closeMenu} disabled={!menuIsOpen}>
        <AccessibleView
          style={[styles.buttonContainer, menuIsOpen && styles.buttonContainerActive]}
          label="More options"
          accessibilityRole="button"
          accessibilityState={{ expanded: menuIsOpen }}
          onPress={onPressButton}
        >
          <MaterialIcons
            name="more-vert"
            style={mixins.headerIcon}
          />
        </AccessibleView>
        {menuIsOpen ? (
          <View style={mixins.shadow}>
            <View style={styles.menuContainer} accessibilityViewIsModal={true}>
              {mappedChildren}
            </View>
          </View>
        ) : null}
      </OutsidePressHandler>
    </View>
  );
}

type ElementWithOnPress = ElementType & {
  props: {
    onPress: () => void;
  }
}

function hasOnPressProp(child: unknown): child is ElementWithOnPress {
  return (child as ReactElement).props.onPress !== undefined;
}
