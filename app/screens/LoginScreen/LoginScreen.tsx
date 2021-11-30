import React, { useState, useEffect } from 'react';
import { Text, Image, AccessibilityInfo, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import appConfig from '../../../app.json';
import { unlock } from '../../store/slices/wallet';
import { SafeScreenView, ErrorDialog, PasswordInput } from '../../components';
import walletImage from '../../assets/wallet.png';

import styles from './LoginScreen.styles';
import { useAccessibilityFocus } from '../../hooks';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [passwordRef, focusPassword] = useAccessibilityFocus<View>();

  const isError = errorText !== '';

  async function _unlockWallet() {
    try {
      AccessibilityInfo.announceForAccessibility('Unlocked Wallet');
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

  useEffect(focusPassword, []);

  return (
    <SafeScreenView style={styles.container}>
      <Image
        style={styles.image}
        source={walletImage}
        accessible
        accessibilityLabel={`${appConfig.displayName} Logo`}
      />
      <Text style={styles.title}>{appConfig.displayName}</Text>
      <Text style={styles.paragraph}>
        A place to store all your credentials. They stay on your device until you
        decide to share them.
      </Text>
      <PasswordInput
        ref={passwordRef}
        style={styles.passwordEntry}
        label="Password"
        value={password}
        onChangeText={setPassword}
        onSubmitEditing={_unlockWallet}
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
