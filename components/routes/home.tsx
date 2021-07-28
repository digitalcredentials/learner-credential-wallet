import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import Theme from '../../style/colors';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Home', style: { color: Theme.textPrimary }}}
      containerStyle={{ backgroundColor: Theme.backgroundSecondary }}
    />
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Theme.backgroundPrimary,
    }}>
      <Text>Home</Text>
    </View>
  </>
);
