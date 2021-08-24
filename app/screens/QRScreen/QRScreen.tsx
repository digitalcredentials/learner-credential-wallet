import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

// TODO: Move add screen into navigation
import { QRScreenProps } from '../../screens/AddScreen/AddScreen.d';
import NavHeader from '../../components/NavHeader/NavHeader';

export default function QRScreen({ navigation: { goBack }}: QRScreenProps): JSX.Element {
  return (
    <View>
      <NavHeader title="Scan QR" goBack={goBack} />
      <QRCodeScanner
        onRead={msg => console.log(msg)}
        topContent={<Text>Derp</Text>}
      />
    </View>
  );
}
