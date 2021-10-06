import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Header, Text, Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import { theme, mixins } from '../../styles';
import styles from './AddScreen.styles';
import { AddScreenProps } from './AddScreen.d';
import { navigationRef } from '../../../App';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { useRequestCredential } from '../../hooks';
import { ConfirmModal } from '../../components';


export default function AddScreen({ navigation, route }: AddScreenProps): JSX.Element {
  const [requestModalIsOpen, setRequestModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { credential, error, loading } = useRequestCredential(route.params);

  function goToImport() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('SettingsNavigation', {
        screen: 'Restore',
        initial: false,
      });
    }
  }

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

    if (credential) {
      setRequestModalIsOpen(false);
      dispatch(stageCredentials([credential]));
      navigation.navigate('ApproveCredentialsScreen');
    }
  }, [credential, loading]);

  return (
    <>
      <Header
        centerComponent={{ text: 'Add Credential', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
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
          title="Restore from a file"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonIconContainer}
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
