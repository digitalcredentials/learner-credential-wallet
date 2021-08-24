import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { QRScreenProps } from '../../navigation/AddCredentialNavigation/AddCredentialNavigation.d';
import NavHeader from '../../components/NavHeader/NavHeader';
import style from './QRScreen.style';

export default function QRScreen({ navigation: { goBack }}: QRScreenProps): JSX.Element {
  return (
    <View>
      <NavHeader title="Scan QR" goBack={goBack} />
      <QRCodeScanner
        onRead={msg => console.log(msg)}
        topContent={<Text>Derp</Text>}
        topViewStyle={style.emptyContainer}
        bottomViewStyle={style.emptyContainer}
        cameraStyle={style.cameraStyle}
        markerStyle={style.markerStyle}
        showMarker
      />
    </View>
  );
}
