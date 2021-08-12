import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';
import mixins from '../../styles/mixins';

export default function HomeScreen(): JSX.Element {
  const { credentials } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  return (
    <>
      <Header
        centerComponent={{ text: 'Home', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={mixins.bodyContainer}>
        <Text>Home</Text>
        <Text>{JSON.stringify(credentials)}</Text>
      </View>
    </>
  );
}
