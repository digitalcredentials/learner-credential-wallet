import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ApproveCredentialsScreen, ApproveCredentialScreen, ChooseProfileScreen, IssuerInfoScreen } from '../../screens';
import type { AcceptCredentialsNavigationParamList } from '..';

const Stack = createStackNavigator<AcceptCredentialsNavigationParamList>();

export default function AcceptCredentialsNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChooseProfileScreen" component={ChooseProfileScreen} />
      <Stack.Screen name="ApproveCredentialsScreen" component={ApproveCredentialsScreen} />
      <Stack.Screen name="ApproveCredentialScreen" component={ApproveCredentialScreen} />
      <Stack.Screen name="IssuerInfoScreen" component={IssuerInfoScreen} />
    </Stack.Navigator>
  );
}
