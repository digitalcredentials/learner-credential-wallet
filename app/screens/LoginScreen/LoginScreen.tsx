import React, { useState } from 'react';
import { Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import styles from './LoginScreen.style';
import theme from '../../styles/theme';
import { unlock } from '../../store/slices/wallet';
import SafeScreenView from '../../components/SafeScreenView/SafeScreenView';
import walletImage from '../../assets/wallet.png';

export default function LoginScreen(): JSX.Element {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');

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
        onPress={() => dispatch(unlock())}
      />
    </SafeScreenView>
  );
}
