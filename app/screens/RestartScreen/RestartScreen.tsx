import React from 'react';
import styles from './RestartScreen.styles';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';

import { SafeScreenView } from '../../components';
import walletImage from '../../assets/wallet.png';

export default function RestartScreen(): JSX.Element {
  function exit() {
    RNExitApp.exitApp();
  }

  return (
    <SafeScreenView style={styles.container}>
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>Restart Application</Text>
      <Text style={styles.paragraph}>Please exit the application, then re-open it.</Text>
      <Button
        buttonStyle={styles.buttonPrimary}
        containerStyle={styles.buttonPrimaryContainer}
        titleStyle={styles.buttonPrimaryTitle}
        title="Exit App"
        onPress={exit}
      />
    </SafeScreenView>
  );
}
