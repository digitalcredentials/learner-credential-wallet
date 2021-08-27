import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './SafeScreenView.styles';
import type { SafeScreenViewProps } from './SafeScreenView.d';

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
