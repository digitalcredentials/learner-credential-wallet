import React, { useState,  } from 'react';
import {  Text, Linking } from 'react-native';
import { View, useWindowDimensions, StyleSheet } from 'react-native';

import { ConfirmModal } from '../../components';
import { NavHeader } from '../../components';
import { QRScreenProps } from './QRScreen.d';
import dynamicStyleSheet from './QRScreen.styles';
import { errorMessageFrom } from '../../lib/error';
import { useDynamicStyles } from '../../hooks';
import {Camera, CodeType, useCameraDevice, useCameraFormat, useCodeScanner} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {useAppState} from '@react-native-community/hooks';
import {Code} from 'react-native-vision-camera/src/CodeScanner';
const codeTypes: CodeType[] = ['qr'];
export default function QRScreen({ navigation, route }: QRScreenProps)  {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const { onReadQRCode, instructionText } = route.params;

  const [errorMessage, setErrorMessage] = useState('');
  const { width } = useWindowDimensions();

  const errorModalOpen = errorMessage !== '';

  function Instructions(): JSX.Element {
    return (
      <Text style={styles.instructionText}>
        {instructionText}
      </Text>
    );
  }

  async function onRead(codes: Code[]) {
    try {
      // await onReadQRCode(text);
    } catch (err) {
      setErrorMessage(errorMessageFrom(err));
    }

  }

  function onRequestModalClose() {
    setErrorMessage('');
    // setTimeout(() => scannerRef.current?.reactivate(), 1000);
  }

  function goToSettings() {
    Linking.openSettings();
  }

  function navGoBack() {
    navigation.goBack();
  }

  // function NoCameraPermission(): JSX.Element {
  //   return (
  //     <View>
  //       {
  //         Alert.alert(
  //           'Camera Access is Off',
  //           'Please go into your camera settings and enable access for this app',
  //           [
  //             {
  //               text: 'Go Back',
  //               onPress: navGoBack
  //             },
  //             {
  //               text: 'Settings',
  //               onPress: goToSettings
  //             }
  //           ])
  //       }
  //     </View>
  //   );
  // }

  const codeScanner = useCodeScanner({
    codeTypes: codeTypes,
    onCodeScanned: onRead,
  });

  const device = useCameraDevice('back');

  const format = useCameraFormat(device, [
    {photoResolution: {width: 1920, height: 1080}},
    {videoResolution: {width: 1920, height: 1080}},
  ]);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  if (!device) {
    return null;
    // TODO should return <NoCameraView />;
  }


  return (
    <View style={styles.scannerBody}>
      <NavHeader title="QR Code Scanner" goBack={navigation.goBack} />
      <Camera
        isActive={isActive}
        device={device}
        format={format}
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        // onError={logger.error}
        photoHdr={false}
        orientation="portrait"
        photo
        video={false}
        audio={false}
      />
      {/*<QRCodeScanner*/}
      {/*  ref={scannerRef}*/}
      {/*  onRead={onRead}*/}
      {/*  topContent={<Instructions />}*/}
      {/*  topViewStyle={styles.instructionContainer}*/}
      {/*  bottomViewStyle={styles.emptyContainer}*/}
      {/*  cameraStyle={styles.cameraStyle}*/}
      {/*  markerStyle={[styles.markerStyle, {*/}
      {/*    width: width * 0.8,*/}
      {/*    height: width * 0.8,*/}
      {/*  }]}*/}
      {/*  notAuthorizedView={<NoCameraPermission />}*/}
      {/*  cameraProps={{*/}
      {/*    accessibilityLabel: 'QR Code Scanner, Camera Active',*/}
      {/*    accessible: true,*/}
      {/*    notAuthorizedView: <NoCameraPermission />*/}
      {/*  } as RNCameraProps}*/}
      {/*  showMarker*/}
      {/*/>*/}
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
