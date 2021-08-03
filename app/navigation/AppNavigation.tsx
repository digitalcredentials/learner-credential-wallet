import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import { SetupScreen, LoginScreen } from '../screens';
import { RootState } from '../store';

const Stack = createStackNavigator();

export default () => {
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, boolean>(({ wallet }) => wallet);

  const initialRouteName: string = useMemo(() => (
    !isInitialized ? 'SetupScreen' :
    !isUnlocked ? 'LoginScreen' :
    'HomeNavigation'
  ), []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {isUnlocked ? (
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SetupScreen" component={SetupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
