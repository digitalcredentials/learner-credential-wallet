import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements';

import Theme from '../../style/colors';
import { FontStyle } from '../../style/fonts';

const walletImage = require('../../assets/wallet.png');

export default () => {
  const [password, setPassword] = useState('');

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>EDU Wallet</Text>
      <Text style={styles.paragraph}>
        A place to store all your credentials. They stay on your device until you
        decide to share them.
      </Text>
      <TextInput
        style={styles.passwordEntry}
        autoCompleteType="password"
        secureTextEntry={true}
        autoCorrect={false}
        value={password}
        placeholder="Password"
        placeholderTextColor={Theme.textSecondary}
        onChangeText={setPassword}
        keyboardAppearance="dark"
      />
      <Button
        buttonStyle={styles.buttonPrimary}
        containerStyle={styles.buttonPrimaryContainer}
        titleStyle={styles.buttonPrimaryTitle}
        title="Unlock Wallet"
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.backgroundPrimary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  passwordEntry: {
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: Theme.textPrimary,
    borderColor: Theme.textPrimary,
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
    marginTop: 20,
  },
});

