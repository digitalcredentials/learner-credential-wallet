import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { mixins } from '../../styles';
import { NavHeader } from '../../components';

import styles from './DeveloperScreen.styles';
import { DeveloperScreenProps } from './DeveloperScreen.d';
import { useDispatch } from 'react-redux';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import mockCredential from '../../mock/credential';
import { navigationRef } from '../../navigation';
import { Cache, CacheKey } from '../../lib/cache';

export default function DeveloperScreen({ navigation }: DeveloperScreenProps): JSX.Element {
  const dispatch = useDispatch();

  async function addMockCredential() {
    await dispatch(stageCredentials([mockCredential]));
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', { 
        screen: 'AddCredentialNavigation',
        params: {
          screen: 'ChooseProfileScreen',
        }
      });
    }
  }

  async function clearVerificationCache(): Promise<void> {
    await Cache.getInstance().removeAll(CacheKey.VerificationResult);
  }


  return (
    <>
      <NavHeader title="Developer Settings" goBack={navigation.goBack} />
      <View style={styles.container}>
        <Button
          title="Add mock credential"
          buttonStyle={mixins.buttonIconCompact}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={addMockCredential}
        />
        <Button
          title="Clear verification cache"
          buttonStyle={mixins.buttonIconCompact}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={clearVerificationCache}
        />
      </View>
    </>
  );
}
