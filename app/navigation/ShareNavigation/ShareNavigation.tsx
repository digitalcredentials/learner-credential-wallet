import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ShareNavigationParamsList } from '../';
import {
  ShareHomeScreen,
  PresentationPreviewScreen,
  CredentialScreen,
} from '../../screens';
import ShareSelectionScreen from '../../screens/ShareSelectionScreen/ShareSelectionScreen';
import { PublicLinkScreen } from '../../screens/PublicLinkScreen/PublicLinkScreen';

const Stack = createStackNavigator<ShareNavigationParamsList>();

export default function ShareNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShareHomeScreen" component={ShareHomeScreen} />
      <Stack.Screen name="ShareSelectionScreen" component={ShareSelectionScreen} />
      <Stack.Screen name="PresentationPreviewScreen" component={PresentationPreviewScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} initialParams={{ noShishKabob: true }} />
      <Stack.Screen name="PublicLinkScreen" component={PublicLinkScreen} initialParams={{ noShishKabob: true }} />
    </Stack.Navigator>
  );
}
