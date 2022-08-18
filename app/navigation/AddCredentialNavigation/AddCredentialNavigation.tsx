import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { QRScreen, AddScreen, ApproveCredentialsScreen, ApproveCredentialScreen, ChooseProfileScreen } from '../../screens';
import { useResetNavigationOnBlur } from '../../hooks';
import type { AddCredentialNavigationParamList, AddCredentialNavigationProps } from '../';

const Stack = createStackNavigator<AddCredentialNavigationParamList>();

export default function AddCredentialNavigation({ navigation }: AddCredentialNavigationProps ): JSX.Element {
  useResetNavigationOnBlur(navigation);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="QRScreen" component={QRScreen} />
      <Stack.Screen name="ChooseProfileScreen" component={ChooseProfileScreen} />
      <Stack.Screen name="ApproveCredentialsScreen" component={ApproveCredentialsScreen} />
      <Stack.Screen name="ApproveCredentialScreen" component={ApproveCredentialScreen} />
    </Stack.Navigator>
  );
}
