import React from 'react';
import { View } from 'react-native';
import { Header, Text } from 'react-native-elements';

import { mixins } from '../../styles';
import styles from './ShareHomeScreen.styles';

export default function ShareHomeScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <Header
        centerComponent={{ text: 'Share', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <Text>Share</Text>
    </View>
  );
}
