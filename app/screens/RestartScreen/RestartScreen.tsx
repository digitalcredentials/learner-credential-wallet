import React from 'react';
import styles from './RestartScreen.styles';
import { Text, Image } from 'react-native';

import { SafeScreenView } from '../../components';
import walletImage from '../../assets/wallet.png';

export default function RestartScreen(): JSX.Element {
  return (
    <SafeScreenView style={styles.container}>
      <Image style={styles.image} source={walletImage} />
      <Text style={styles.title}>Restart Application</Text>
      <Text style={styles.paragraph}>Please restart the application.</Text>
    </SafeScreenView>
  );
}
