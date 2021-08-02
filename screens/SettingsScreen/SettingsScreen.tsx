import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './SettingsScreen.style';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Settings', style: styles.headerTitle}}
      containerStyle={styles.headerContainer}
    />
    <View style={styles.bodyContainer}>
      <Text>Settings</Text>
    </View>
  </>
);

