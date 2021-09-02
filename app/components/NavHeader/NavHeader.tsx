import React from 'react';
import { Header } from 'react-native-elements';

import type { NavHeaderProps } from './NavHeader.d';
import { mixins } from '../../styles';

export default function NavHeader({
  title,
  goBack,
  ...headerProps
}: NavHeaderProps): JSX.Element {
  return (
    <Header
      leftContainerStyle={mixins.headerComponentContainer}
      centerContainerStyle={mixins.headerComponentContainer}
      rightContainerStyle={mixins.headerComponentContainer}
      leftComponent={{
        icon: 'arrow-back',
        iconStyle: mixins.headerIcon,
        onPress: goBack,
      }}
      centerComponent={{
        text: title,
        style: mixins.headerTitle,
      }}
      containerStyle={mixins.headerContainer}
      {...headerProps}
    />
  );
}
