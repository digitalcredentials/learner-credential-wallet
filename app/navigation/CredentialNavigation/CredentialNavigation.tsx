import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, CredentialScreen } from '../../screens';

const Stack = createStackNavigator();

export default function CredentialNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} />
    </Stack.Navigator>
  );
}
