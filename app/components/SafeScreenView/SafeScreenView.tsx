import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

export default ({ children, ...rest }) => (
  <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
    <SafeAreaView {...rest}>{children}</SafeAreaView>
  </KeyboardAwareScrollView>
);
