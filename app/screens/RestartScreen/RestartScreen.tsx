import React from 'react';
import styles from './RestartScreen.styles';
import { Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';

import { SafeScreenView } from '../../components';
import walletImage from '../../assets/wallet.png';
import appConfig from '../../../app.json';

export default function RestartScreen(): JSX.Element {
  function exit() {
    RNExitApp.exitApp();
  }

  return (
    <SafeScreenView style={styles.container}>
      <Image 
        style={styles.image}
        source={walletImage}
        accessible
        accessibilityLabel={`${appConfig.displayName} Logo`} />
      <Text style={styles.title} accessibilityRole="header">Restart Application</Text>
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
