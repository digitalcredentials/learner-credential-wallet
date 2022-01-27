import React, { useState, useRef } from 'react';
import { AccessibilityInfo, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { View, useWindowDimensions } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCameraProps } from 'react-native-camera';
import qs from 'query-string';

import { PresentationError } from '../../types/presentation';
import { ConfirmModal } from '../../components';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { credentialsFromQrText, isVpqr } from '../../lib/decode';
import { NavHeader } from '../../components';
import { QRScreenProps } from './QRScreen.d';
import { CredentialRequestParams } from '../../lib/request';
import styles from './QRScreen.styles';

export default function QRScreen({ navigation }: QRScreenProps): JSX.Element {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const scannerRef = useRef<QRCodeScanner>(null);

  function Instructions(): JSX.Element {
    return (
      <Text style={styles.instructionText}>
        Scan a QR code from your issuer to request your credentials.
      </Text>
    );
  }

  async function onRead({ data: text }: BarCodeReadEvent) {
    console.log('Read text from qrcode', text);
    if (!isVpqr(text) && !text.startsWith('dccrequest://request?') ) {
      setErrorModalOpen(true);
      setErrorMessage('The QR code was read, but no credentials were found.');
 
      return;
    }

    if (text.startsWith('dccrequest:request?')) {
      console.log('received deeplink via QR code', text);
      const params: CredentialRequestParams = qs.parse(text.split('?')[1]);
      navigation.navigate('AddScreen', params);
      return;
    }

    await credentialsFromQrText(text)
      .then((credentials) => {
        AccessibilityInfo.announceForAccessibility('QR Code Scanned');
        dispatch(stageCredentials(credentials));
        navigation.navigate('ApproveCredentialsScreen');
      })
      .catch((err) => {
        console.warn(err);
        setErrorModalOpen(true);

        if (Object.values(PresentationError).includes(err.message)) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('An error was encountered when parsing this QR code.');
        }
      });
  }

  function onRequestModalClose() {
    setErrorModalOpen(!errorModalOpen);
    setTimeout(() => scannerRef.current?.reactivate(), 1000);
  }

  return (
    <View style={styles.scannerBody}>
      <NavHeader title="Scan QR" goBack={navigation.goBack} />
      <QRCodeScanner
        ref={scannerRef}
        onRead={onRead}
        topContent={<Instructions />}
        topViewStyle={styles.instructionContainer}
        bottomViewStyle={styles.emptyContainer}
        cameraStyle={styles.cameraStyle}
        markerStyle={[styles.markerStyle, {
          width: width * 0.9,
          height: width * 0.9,
        }]}
        cameraProps={{
          accessibilityLabel: 'QR Code Scanner, Camera Active',
          accessible: true,
        } as RNCameraProps}
        showMarker
      />
      <ConfirmModal
        open={errorModalOpen}
        onRequestClose={onRequestModalClose}
        confirmText="Okay"
        cancelButton={false}
        cancelOnBackgroundPress
        title={errorMessage}
      />
    </View>
  );
}
