import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default ({ children, ...rest }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView {...rest}>
      {children}
    </SafeAreaView>
  </TouchableWithoutFeedback>
);
