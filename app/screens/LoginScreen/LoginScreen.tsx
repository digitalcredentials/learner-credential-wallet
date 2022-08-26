import React, { useState, useEffect } from 'react';
import { Text, Image, AccessibilityInfo, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';

import appConfig from '../../../app.json';
import { selectWalletState, unlock, unlockWithBiometrics } from '../../store/slices/wallet';
import { SafeScreenView, ErrorDialog, PasswordInput } from '../../components';
import walletImage from '../../assets/wallet.png';

import styles from './LoginScreen.styles';
import { useAccessibilityFocus, useAppDispatch, useAsyncValue } from '../../hooks';
import { theme } from '../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getBiometryIconName, isBiometricsSupported } from '../../lib/biometrics';

export default function LoginScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isBiometricsEnabled } = useSelector(selectWalletState);
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [passwordRef, focusPassword] = useAccessibilityFocus<View>();
  const [biometryIconName] = useAsyncValue(getBiometryIconName);
  const [biometrySupported] = useAsyncValue(isBiometricsSupported);

  const isError = errorText !== '';
  const biometryIcon = biometryIconName ? <MaterialCommunityIcons name={biometryIconName} size={theme.iconSize} color={theme.color.textSecondary} /> : undefined;
  const showBiometricsButton = biometrySupported && biometryIcon && isBiometricsEnabled;

  async function _unlockWallet() {
    try {
      await dispatch(unlock(password));
      AccessibilityInfo.announceForAccessibility('Unlocked Wallet');
    } catch (err) {
      setErrorText('Incorrect password');
    }
  }

  async function _unlockWalletWithBiometrics() {
    try {
      await dispatch(unlockWithBiometrics());
      AccessibilityInfo.announceForAccessibility('Unlocked Wallet');
    } catch (err) {
      setErrorText('Unable to verify identify, please enter password');
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
        highlightError={isError}
      />
      <ErrorDialog message={errorText} />
      <Button
        buttonStyle={styles.buttonPrimary}
        containerStyle={styles.buttonPrimaryContainer}
        titleStyle={styles.buttonPrimaryTitle}
        title="Unlock Wallet"
        onPress={_unlockWallet}
      />
      {showBiometricsButton && (
        <Button
          buttonStyle={styles.buttonClear}
          titleStyle={styles.buttonClearTitle}
          containerStyle={styles.buttonClearContainer}
          title="Use Biometrics"
          icon={biometryIcon}
          onPress={_unlockWalletWithBiometrics}
        />
      )}
    </SafeScreenView>
  );
}
