import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { DebugScreen, VerificationStatusScreen } from '../../screens';
import {
  HomeNavigation,
  RootNavigationParamsList,
  AcceptCredentialsNavigation
} from '../../navigation';

const Stack = createStackNavigator<RootNavigationParamsList>();

export default function RootNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      <Stack.Screen name="DebugScreen" component={DebugScreen} />
      <Stack.Screen name="VerificationStatusScreen" component={VerificationStatusScreen} />
      <Stack.Screen name="AcceptCredentialsNavigation" component={AcceptCredentialsNavigation} />
    </Stack.Navigator>
  );
}
