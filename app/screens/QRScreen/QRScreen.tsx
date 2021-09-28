import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent } from 'react-native-camera';

import { stageCredentials } from '../../store/slices/credentialFoyer';
import { credentialsFromQrText } from '../../lib/decode';
import { NavHeader } from '../../components';
import { QRScreenProps } from './QRScreen.d';
import styles from './QRScreen.styles';

export default function QRScreen({ navigation }: QRScreenProps): JSX.Element {
  const dispatch = useDispatch();

  function Instructions(): JSX.Element {
    return (
      <Text style={styles.instructionText}>
        Scan a QR code from your issuer to request your credentials.
      </Text>
    );
  }

  async function onRead(e: BarCodeReadEvent) {
    const credentials = await credentialsFromQrText(e.data);
    dispatch(stageCredentials(credentials));

    navigation.navigate('ApproveCredentialsScreen');
  }

  return (
    <View style={styles.scannerBody}>
      <NavHeader title="Scan QR" goBack={navigation.goBack} />
      <QRCodeScanner
        onRead={onRead}
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
