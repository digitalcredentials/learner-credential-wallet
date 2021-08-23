import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function QRScreen(): JSX.Element {
  return (
    <View>
      <QRCodeScanner
        onRead={msg => console.log(msg)}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={<Text>Derp</Text>}
      />
    </View>
  );
}
