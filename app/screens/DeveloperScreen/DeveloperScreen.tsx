import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { NavHeader } from '../../components';
import dynamicStyleSheet from './DeveloperScreen.styles';
import { DeveloperScreenProps } from './DeveloperScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { credentials } from '../../mock/credential';
import { navigationRef } from '../../navigation';
import { Cache, CacheKey } from '../../lib/cache';
import { useAppDispatch, useDynamicStyles } from '../../hooks';

export default function DeveloperScreen({ navigation }: DeveloperScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const dispatch = useAppDispatch();

  async function addMockCredential() {
    await dispatch(stageCredentials(credentials));
    if (navigationRef.isReady()) {
      navigationRef.navigate('AcceptCredentialsNavigation', { 
        screen: 'ChooseProfileScreen',
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
          title="Add mock credentials"
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
