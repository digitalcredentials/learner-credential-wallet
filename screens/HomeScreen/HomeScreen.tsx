import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './HomeScreen.style';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Home', style: styles.headerTitle}}
      containerStyle={styles.headerContainer}
    />
    <View style={styles.bodyContainer}>
      <Text>Home</Text>
    </View>
  </>
);
