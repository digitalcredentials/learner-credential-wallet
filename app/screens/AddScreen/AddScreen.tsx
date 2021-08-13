import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import mixins from '../../styles/mixins';

export default function AddScreen(): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Add', style: mixins.headerText}}
        containerStyle={mixins.headerContainer}
      />
      <View style={mixins.bodyContainer}>
        <Text>Add</Text>
      </View>
    </>
  );
}
