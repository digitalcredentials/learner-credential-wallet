import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import styles from './AddScreen.style';

export default () => (
  <>
    <Header
      centerComponent={{ text: 'Add', style: styles.headerTitle}}
      containerStyle={styles.headerContainer}
    />
    <View style={styles.bodyContainer}>
      <Text>Add</Text>
    </View>
  </>
);
