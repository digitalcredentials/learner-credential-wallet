import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import Setup from '../components/routes/setup';
import Login from '../components/routes/login';

const Stack = createStackNavigator();

interface AppNavigationProps {
  initialRouteName?: string;
}

export default (props: AppNavigationProps) => {
  const { initialRouteName } = props;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="Setup" component={Setup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
}
