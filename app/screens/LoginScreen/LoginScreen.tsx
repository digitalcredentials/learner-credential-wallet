import React, { useState, useEffect } from 'react';
import { Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { theme } from '../../styles';
import { unlock } from '../../store/slices/wallet';
import { SafeScreenView, ErrorDialog } from '../../components';
import walletImage from '../../assets/wallet.png';

import styles from './LoginScreen.styles';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const isError = errorText !== '';
  const passwordInputStyle = [
    styles.passwordEntry,
    isError ? styles.passwordError : null,
  ];

  async function _unlockWallet() {
    try {
      await dispatch(unlock(password));
    } catch (err) {
      setErrorText('Incorrect password');
    }
  }

  // Removes error when user begins typing
  useEffect(() => {
    if (isError) {
      setErrorText('');
    }
  }, [password]);

  return (
    <SafeScreenView style={styles.container}>
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>EDU Wallet</Text>
      <Text style={styles.paragraph}>
        A place to store all your credentials. They stay on your device until you
        decide to share them.
      </Text>
      <TextInput
        style={passwordInputStyle}
        autoCompleteType="password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        placeholder="Password"
        placeholderTextColor={theme.color.textSecondary}
        onChangeText={setPassword}
        keyboardAppearance="dark"
      />
      <ErrorDialog message={errorText} />
      <Button
        buttonStyle={styles.buttonPrimary}
        containerStyle={styles.buttonPrimaryContainer}
        titleStyle={styles.buttonPrimaryTitle}
        title="Unlock Wallet"
        onPress={_unlockWallet}
      />

    </SafeScreenView>
  );
}
