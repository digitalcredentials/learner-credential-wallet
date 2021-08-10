import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  SafeAreaView,
  NativeSafeAreaViewProps,
} from 'react-native-safe-area-context';

import styles from './SafeScreenView.styles';

export interface SafeScreenViewProps extends NativeSafeAreaViewProps {
  children: React.ReactNode;
}

export default function SafeScreenView({
  children,
  ...rest
}: SafeScreenViewProps): JSX.Element {
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <SafeAreaView {...rest}>{children}</SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
