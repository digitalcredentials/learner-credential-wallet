import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen, CredentialScreen } from '../../screens';
import { CredentialNavigationProps, CredentialNavigationParamList } from '../';
import { ShareCredentialScreen } from '../../screens';
import { useResetNavigationOnBlur } from '../../hooks';

const Stack = createStackNavigator<CredentialNavigationParamList>();

export default function CredentialNavigation({ navigation }: CredentialNavigationProps): JSX.Element {
  useResetNavigationOnBlur(navigation);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CredentialScreen" component={CredentialScreen} />
      <Stack.Screen name="ShareCredentialScreen" component={ShareCredentialScreen} />
    </Stack.Navigator>
  );
}
