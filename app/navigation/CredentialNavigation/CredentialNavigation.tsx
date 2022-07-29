import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, CredentialScreen } from '../../screens';
import { CredentialNavigationParamList } from '../';
import { ShareCredentialScreen } from '../../screens/ShareCredentialScreen/ShareCredentialScreen';

const Stack = createStackNavigator<CredentialNavigationParamList>();

export default function CredentialNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} />
      <Stack.Screen name="ShareCredentialScreen" component={ShareCredentialScreen} />
    </Stack.Navigator>
  );
}
