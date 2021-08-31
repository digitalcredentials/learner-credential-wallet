import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ShareNavigationParamsList } from '../';
import {
  ShareHomeScreen,
  PresentationPreviewScreen,
  CredentialScreen,
} from '../../screens';

const Stack = createStackNavigator<ShareNavigationParamsList>();

export default function ShareNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShareHomeScreen" component={ShareHomeScreen} />
      <Stack.Screen name="PresentationPreviewScreen" component={PresentationPreviewScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} />
    </Stack.Navigator>
  );
}
