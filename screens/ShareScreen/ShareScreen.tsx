import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './ShareScreen.style';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Share', style: styles.headerTitle}}
      containerStyle={styles.headerContainer}
    />
    <View style={styles.bodyContainer}>
      <Text>Share</Text>
    </View>
  </>
);

