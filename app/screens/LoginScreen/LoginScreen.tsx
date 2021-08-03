import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import styles from './LoginScreen.style';
import theme from '../../styles/theme';
import { unlock } from '../../store/slices/wallet';

const walletImage = require('../../assets/wallet.png');

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

  function _login() {
    dispatch(unlock());
    navigation.navigate('HomeNavigation');
  }

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
        secureTextEntry
        autoCorrect={false}
        value={password}
        placeholder="Password"
        placeholderTextColor={theme.color.textSecondary}
        onChangeText={setPassword}
        keyboardAppearance="dark"
      />
      <Button
        buttonStyle={styles.buttonPrimary}
        containerStyle={styles.buttonPrimaryContainer}
        titleStyle={styles.buttonPrimaryTitle}
        title="Unlock Wallet"
        onPress={_login}
      />
    </KeyboardAwareScrollView>
  );
}
