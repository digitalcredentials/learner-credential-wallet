import React from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MaterialIcons } from '@expo/vector-icons';
import { Header, Button } from 'react-native-elements';

// TODO: Move add screen into navigation
import { QRScreenProps } from '../../screens/AddScreen/AddScreen.d';
import mixins from '../../styles/mixins';
import style from './QRScreen.style';

type BackButtonProps = {
  onPress: () => void;
}

// TODO: Make this it's own component to be DRY (also in settings screen)
function BackButton({ onPress }: BackButtonProps): JSX.Element {
  return (
    <Button
      onPress={onPress}
      buttonStyle={style.buttonStyle}
      icon={(
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          style={style.iconStyle}
        />
      )}
      title=""
    />
  );
}

export default function QRScreen({ navigation: { goBack }}: QRScreenProps): JSX.Element {
  return (
    <View>
      <Header
        centerComponent={{ text: 'Restore', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
        leftComponent={<BackButton onPress={goBack} />}
      />
      <QRCodeScanner
        onRead={msg => console.log(msg)}
        topContent={<Text>Derp</Text>}
      />
    </View>
  );
}
