import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import styles from './SetupScreen.style';

const walletImage = require('../../assets/wallet.png');

export default () => (
  <View style={styles.container}>
    <Image style={styles.image} source={walletImage} />
    <Text style={styles.title}>EDU Wallet</Text>
    <Text style={styles.paragraph}>
      A place to store all your credentials. They stay on your device until you
      decide to share them.
    </Text>
    <Button
      buttonStyle={styles.buttonPrimary}
      containerStyle={styles.buttonPrimaryContainer}
      titleStyle={styles.buttonPrimaryTitle}
      title="Start Setup"
    />
  </View>
);
