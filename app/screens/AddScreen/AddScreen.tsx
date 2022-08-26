import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useAppDispatch } from '../../hooks';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import styles from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { useRequestCredentials } from '../../hooks';
import { ConfirmModal, NavHeader } from '../../components';
import { credentialRequestParamsFromQrText, credentialsFromQrText, isDeepLink, isVpqr } from '../../lib/decode';
import { PresentationError } from '../../types/presentation';
import { HumanReadableError } from '../../lib/error';


export default function AddScreen({ navigation, route }: AddScreenProps): JSX.Element {
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { credentials, error, loading } = useRequestCredentials(route.params);

  useEffect(() => {
    if (loading) {
      setRequestModalIsOpen(true);
      navigation.setParams({
        auth_type: undefined,
        issuer: undefined, 
        vc_request_url: undefined, 
        challenge: undefined,
      });
    }

    if (credentials) {
      setRequestModalIsOpen(false);
      dispatch(stageCredentials(credentials));
      navigation.navigate('ChooseProfileScreen');
    }
  }, [credentials, loading]);

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

      navigation.navigate('AddScreen', params);
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
      <ConfirmModal
        open={requestModalIsOpen}
        onRequestClose={() => setRequestModalIsOpen(false)}
        confirmButton={!loading}
        cancelOnBackgroundPress={!loading}
        cancelButton={false}
        title="Handling Credential Request"
        confirmText="Close"
      >
        {loading ? (
          <View style={styles.loadingContainer}> 
            <AnimatedEllipsis style={styles.loadingDots} minOpacity={0.4} animationDelay={200}/>
          </View>
        ) : (
          <Text style={styles.modalText}>{error}</Text>
        )}
      </ConfirmModal>
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          To add credentials, follow an approved link from an issuer (most often a
          University) or use the options below.
        </Text>
        <Button
          title="Scan QR code"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
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
