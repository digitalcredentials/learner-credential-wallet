import React from 'react';
import style from './NavHeader.style';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';

import type { NavHeaderProps, BackButtonProps } from './NavHeader.d';
import mixins from '../../styles/mixins';

// TODO: Make this it's own component to be DRY (also in settings screen)
function BackButton({ onPress }: BackButtonProps): JSX.Element {
  return (
    <Button
      onPress={onPress}
      buttonStyle={style.buttonStyle}
      icon={(
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          style={style.iconStyle}
        />
      )}
      title=""
    />
  );
}

export default function NavHeader({ title, goBack }: NavHeaderProps): JSX.Element {
  return (
    <Header
      centerComponent={{ text: title, style: mixins.headerTitle}}
      containerStyle={mixins.headerContainer}
      leftComponent={<BackButton onPress={goBack} />}
    />
  );
}
