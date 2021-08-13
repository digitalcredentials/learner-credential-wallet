import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import mixins from '../../styles/mixins';

export default function ShareScreen(): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Share', style: mixins.headerText }}
        containerStyle={mixins.headerContainer}
      />
      <View style={mixins.bodyContainer}>
        <Text>Share</Text>
      </View>
    </>
  );
}
