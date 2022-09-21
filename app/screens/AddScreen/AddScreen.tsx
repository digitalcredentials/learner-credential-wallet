import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useAppDispatch } from '../../hooks';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import styles from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { NavHeader } from '../../components';
import { credentialRequestParamsFromQrText, credentialsFromQrText, isDeepLink, isVpqr } from '../../lib/decode';
import { PresentationError } from '../../types/presentation';
import { HumanReadableError } from '../../lib/error';


export default function AddScreen({ navigation }: AddScreenProps): JSX.Element {
  const dispatch = useAppDispatch();

  function onPressQRScreen() {
    navigation.navigate('CredentialQRScreen', {
      instructionText: 'Scan a QR code from your issuer to request your credentials.',
      onReadQRCode,
    });
  }

  async function onReadQRCode(text: string) {
    if (isDeepLink(text)) {
      console.log('Received deep link via QR code', text);
      const params = credentialRequestParamsFromQrText(text);

      navigation.navigate('ChooseProfileScreen', params);
    } else if (isVpqr(text)) {
      try {
        const credentials = await credentialsFromQrText(text);
        AccessibilityInfo.announceForAccessibility('QR Code Scanned');
        dispatch(stageCredentials(credentials));
        navigation.navigate('ChooseProfileScreen');
      } catch (err) {
        console.warn(err);
        const message = (err as Error).message;

        if ((Object.values(PresentationError) as string[]).includes(message)) {
          throw new HumanReadableError(message);
        } else {
          throw new HumanReadableError('An error was encountered when parsing this QR code.');
        }
      }
    } else {
      throw new HumanReadableError('The QR code was read, but no credentials were found.');
    }
  }

  return (
    <>
      <NavHeader title="Add Credential" />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          To add credentials, follow an approved link from an issuer (most often a
          University) or use the options below.
        </Text>
        <Button
          title="Scan QR code"
          buttonStyle={mixins.buttonIcon}
          containerStyle={[mixins.buttonIconContainer, mixins.noFlex]}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={onPressQRScreen}
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}
