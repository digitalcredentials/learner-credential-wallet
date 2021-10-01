import React, { useState, useEffect } from 'react';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
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
        style={styles.passwordEntry}
        autoCompleteType="password"
        secureTextEntry
        autoCorrect={false}
        value={password}
        outlineColor={isError ? theme.color.error : theme.color.textPrimary}
        selectionColor={theme.color.foregroundPrimary}
        theme={{ colors: {
          placeholder: theme.color.textPrimary,
          text: theme.color.textPrimary,
          primary: theme.color.brightAccent,
        }}}
        label="Password"
        mode="outlined"
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
