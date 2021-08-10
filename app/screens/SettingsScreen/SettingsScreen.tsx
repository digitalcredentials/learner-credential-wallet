import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import mixins from '../../styles/mixins';
import { lock } from '../../store/slices/wallet';

export default () => {
  const dispatch = useDispatch();
  return (
    <>
      <Header
        centerComponent={{ text: 'Settings', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={mixins.bodyContainer}>
        <Text>Settings</Text>
        <Button title="Lock Wallet" onPress={() => dispatch(lock())} />
      </View>
    </>
  );
};
