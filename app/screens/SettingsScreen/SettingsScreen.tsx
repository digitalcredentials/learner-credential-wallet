import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import mixins from '../../styles/mixins';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Settings', style: mixins.headerTitle}}
      containerStyle={mixins.headerContainer}
    />
    <View style={mixins.bodyContainer}>
      <Text>Settings</Text>
    </View>
  </>
);
