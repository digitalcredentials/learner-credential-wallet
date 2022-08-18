import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import styles from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { useRequestCredentials } from '../../hooks';
import { ConfirmModal, NavHeader } from '../../components';


export default function AddScreen({ navigation, route }: AddScreenProps): JSX.Element {
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);
  const dispatch = useDispatch();

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
          title="Choose Profile (Dev)"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
          titleStyle={mixins.buttonIconTitle}
          onPress={() => navigation.navigate('ChooseProfileScreen')}
        />
      </View>
    </>
  );
}
