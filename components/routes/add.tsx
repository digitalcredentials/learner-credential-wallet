import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import Theme from '../../style/colors';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Add', style: { color: Theme.textPrimary }}}
      containerStyle={{ backgroundColor: Theme.backgroundSecondary, borderBottomWidth: 0 }}
    />
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Theme.backgroundPrimary,
    }}>
      <Text>Add</Text>
    </View>
  </>
);
