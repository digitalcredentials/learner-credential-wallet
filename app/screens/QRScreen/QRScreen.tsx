import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { NavHeader } from '../../components';
import { QRScreenProps } from './QRScreen.d';
import styles from './QRScreen.styles';

export default function QRScreen({ navigation: { goBack }}: QRScreenProps): JSX.Element {
  function Instructions(): JSX.Element {
    return (
      <Text style={styles.instructionText}>
        Scan a QR code from your issuer to request your credentials.
      </Text>
    );
  }

  return (
    <View style={styles.scannerBody}>
      <NavHeader title="Scan QR" goBack={goBack} />
      <QRCodeScanner
        onRead={msg => console.log(msg)}
        topContent={<Instructions />}
        topViewStyle={styles.instructionContainer}
        bottomViewStyle={styles.emptyContainer}
        cameraStyle={styles.cameraStyle}
        markerStyle={styles.markerStyle}
        showMarker
      />
    </View>
  );
}
