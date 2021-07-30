import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Header, Button } from 'react-native-elements';

import Theme from '../../style/colors';
import { FontStyle } from '../../style/fonts';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgroundPrimary,
    padding: 16,
  },
  image: {
    height: 72,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FontStyle.Bold,
    fontSize: 36,
    color: Theme.textPrimary,
    padding: 16,
  },
  paragraph: {
    fontFamily: FontStyle.Regular,
    fontSize: 18,
    color: Theme.textSecondary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonPrimary: {
    backgroundColor: Theme.buttonPrimary,
    padding: 16,
    borderRadius: 5,
  },
  buttonPrimaryTitle: {
    fontFamily: FontStyle.Medium,
    fontSize: 16,
    color: Theme.backgroundSecondary,
  },
  buttonPrimaryContainer: {
    width: '100%',
  },
});
