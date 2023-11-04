import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExchangeCredentials } from '../../screens';
import { ExchangeCredentialsNavigationParamList } from '..';

const Stack = createStackNavigator<ExchangeCredentialsNavigationParamList>();

export default function ExchangeCredentialsNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExchangeCredentials" component={ExchangeCredentials} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
