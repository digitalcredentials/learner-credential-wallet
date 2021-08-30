import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { QRScreen, AddScreen } from '../../screens';
import type { StackParamList } from './AddCredentialNavigation.d';

const Stack = createStackNavigator<StackParamList>();

export default function AddCredentialNavigation(): JSX.Element {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
    </Stack.Navigator>
  );
}
