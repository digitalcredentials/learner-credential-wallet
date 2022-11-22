import React from 'react';
import { Linking, View } from 'react-native';
import { Button } from 'react-native-elements';

import { NavHeader } from '../../components';
import dynamicStyleSheet from './DeveloperScreen.styles';
import { DeveloperScreenProps } from './DeveloperScreen.d';
import { stageCredentials } from '../../store/slices/credentialFoyer';
import { credentials } from '../../mock/credential';
import { navigationRef } from '../../navigation';
import { Cache, CacheKey } from '../../lib/cache';
import { useAppDispatch, useDynamicStyles } from '../../hooks';
import { revokedCredential } from '../../mock/revokedCredential';
import { NavigationUtil } from '../../lib/navigationUtil';

export default function DeveloperScreen({ navigation }: DeveloperScreenProps): JSX.Element {
  const { styles, mixins } = useDynamicStyles(dynamicStyleSheet);
  const dispatch = useAppDispatch();

  async function goToApproveCredentials() {
    if (navigationRef.isReady()) {
      const rawProfileRecord = await NavigationUtil.selectProfile();
      navigationRef.navigate('AcceptCredentialsNavigation', { 
        screen: 'ApproveCredentialsScreen',
        params: {
          rawProfileRecord,
        }
      });
    }
  }

  async function addMockCredentials() {
    await dispatch(stageCredentials(credentials));
    goToApproveCredentials();
  }

  async function addRevokedCredential() {
    await dispatch(stageCredentials([revokedCredential]));
    goToApproveCredentials();
  }

  function receiveCredentialThroughDeepLink() {
    Linking.openURL('dccrequest://request?issuer=https%3A%2F%2Fissuer.example.com&vc_request_url=https://verify.dcconsortium.org/request/credential&challenge=ke12345678-0001&auth_type=bearer');
  }

  function startShareRequest() {
    Linking.openURL('dccrequest://present?client_id=did%3Akey%3Az6MkpLDL3RoAoMRTwTgo3rs39ZwssfaPKtGdZw7AGRN7CK4W&nonce=123456&redirect_uri=https%3A%2F%2Fexample.com');
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
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={addMockCredentials}
        />
        <Button
          title="Add revoked credential"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={addRevokedCredential}
        />
        <Button
          title="Receive credential through deep link"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={receiveCredentialThroughDeepLink}
        />
        <Button
          title="Credential share request with deep link"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={startShareRequest}
        />
        <Button
          title="Clear verification cache"
          buttonStyle={mixins.buttonIcon}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          onPress={clearVerificationCache}
        />
      </View>
    </>
  );
}
