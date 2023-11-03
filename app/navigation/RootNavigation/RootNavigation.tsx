import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  CredentialSelectionScreen,
  DebugScreen,
  ProfileSelectionScreen,
  QRScreen,
  VerificationStatusScreen,
  ViewSourceScreen
} from '../../screens';
import {
  HomeNavigation,
  RootNavigationParamsList,
  AcceptCredentialsNavigation,
  ExchangeCredentialsNavigation
} from '../../navigation';

const Stack = createStackNavigator<RootNavigationParamsList>();

export default function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      <Stack.Screen name="DebugScreen" component={DebugScreen} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
      <Stack.Screen name="VerificationStatusScreen" component={VerificationStatusScreen} />
      <Stack.Screen name="AcceptCredentialsNavigation" component={AcceptCredentialsNavigation} />
      <Stack.Screen
        name="ExchangeCredentialsNavigation"
        component={ExchangeCredentialsNavigation}
        options={{
          presentation: 'modal'
        }} />
      <Stack.Screen name="ProfileSelectionScreen" component={ProfileSelectionScreen} />
      <Stack.Screen name="CredentialSelectionScreen" component={CredentialSelectionScreen} />
      <Stack.Screen name="ViewSourceScreen" component={ViewSourceScreen} />
    </Stack.Navigator>
  );
}
