import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ShareNavigationParamsList } from '../';
import {
  ShareHomeScreen,
  PresentationPreviewScreen,
  CredentialScreen,
  CredentialSelectionScreen,
  PublicLinkScreen,
} from '../../screens';

const Stack = createStackNavigator<ShareNavigationParamsList>();

export default function ShareNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShareHomeScreen" component={ShareHomeScreen} />
      <Stack.Screen name="CredentialSelectionScreen" component={CredentialSelectionScreen} />
      <Stack.Screen name="PresentationPreviewScreen" component={PresentationPreviewScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} initialParams={{ noShishKabob: true }} />
      <Stack.Screen name="PublicLinkScreen" component={PublicLinkScreen} />
    </Stack.Navigator>
  );
}
