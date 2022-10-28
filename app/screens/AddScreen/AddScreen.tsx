import React, { useState } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useAppDispatch, useDynamicStyles } from '../../hooks';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import dynamicStyleSheet from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { NavHeader } from '../../components';
import { credentialRequestParamsFromQrText, credentialsFrom, credentialsFromQrText, isDeepLink, isVpqr } from '../../lib/decode';
import { PresentationError } from '../../types/presentation';
import { errorMessageMatches, HumanReadableError } from '../../lib/error';
import { navigationRef } from '../../navigation';
import { CredentialRequestParams } from '../../lib/request';
import { pickAndReadFile } from '../../lib/import';
import { displayGlobalError } from '../../store/slices/wallet';
import { CANCEL_PICKER_MESSAGES } from '../../lib/constants';

export default function AddScreen({ navigation }: AddScreenProps): JSX.Element {
  const { styles, theme, mixins } = useDynamicStyles(dynamicStyleSheet);
  const dispatch = useAppDispatch();

  function onPressQRScreen() {
    navigation.navigate('CredentialQRScreen', {
      instructionText: 'Scan a QR code from your issuer to request your credentials.',
      onReadQRCode,
    });
  }

  function goToChooseProfile(params?: CredentialRequestParams) {
    if (navigationRef.isReady()) {
      if (navigationRef.isReady()) {
        navigationRef.navigate('AcceptCredentialsNavigation', { 
          screen: 'ChooseProfileScreen',
          params,
        });
      }
    }
  }

  async function addCredentialFromFile() {
    try {
      const data = await pickAndReadFile();
      const credentials = await credentialsFrom(data);
      dispatch(stageCredentials(credentials));
      goToChooseProfile();
    } catch (err) {
      if (errorMessageMatches(err, CANCEL_PICKER_MESSAGES)) return;

      console.error(err);
      await dispatch(displayGlobalError({ 
        title: 'Unable to Add Credentials',
        message: 'Ensure the file contains one or more credentials, and is a supported file type.' 
      }));
    }
  }

  async function onReadQRCode(text: string) {
    if (isDeepLink(text)) {
      console.log('Received deep link via QR code', text);
      const params = credentialRequestParamsFromQrText(text);
      goToChooseProfile(params);
    } else if (isVpqr(text)) {
      try {
        const credentials = await credentialsFromQrText(text);
        AccessibilityInfo.announceForAccessibility('QR Code Scanned');
        dispatch(stageCredentials(credentials));
        goToChooseProfile();
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
          buttonStyle={mixins.buttonIconCompact}
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
        <Button
          title="Add from file"
          buttonStyle={mixins.buttonIconCompact}
          containerStyle={[mixins.buttonIconContainer, mixins.noFlex]}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={addCredentialFromFile}
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
