import React from 'react';
import { View } from 'react-native';
import { Header, Text, Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import theme from '../../styles/theme';
import mixins from '../../styles/mixins';
import style from './AddScreen.style';
import { AddScreenProps } from '../../navigation/AddCredentialNavigation/AddCredentialNavigation.d';
import { navigationRef } from '../../../App';

export default function AddScreen({ navigation }: AddScreenProps): JSX.Element {
  function goToImport() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('SettingsNavigation', { screen: 'Restore' });
    }
  }

  return (
    <>
      <Header
        centerComponent={{ text: 'Add Credential', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={style.container}>
        <Text style={style.paragraph}>
          To add credentials, follow an approved link from an issuer (most often a
          University) or use the options below.
        </Text>
        <Button
          title="Scan QR code"
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={() => navigation.navigate('QRScreen')}
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
        <Button
          title="Restore from a file"
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={goToImport}
          icon={
            <MaterialCommunityIcons
              name="file-upload"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}
