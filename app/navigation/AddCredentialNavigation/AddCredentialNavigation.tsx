import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { QRScreen, AddScreen } from '../../screens';
import type { AddCredentialNavigationParamList } from '../';

const Stack = createStackNavigator<AddCredentialNavigationParamList>();

export default function AddCredentialNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
    </Stack.Navigator>
  );
}
