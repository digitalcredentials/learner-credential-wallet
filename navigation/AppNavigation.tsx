import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import Setup from '../components/routes/setup';
import Login from '../components/routes/login';
import { RootState } from '../store';

const Stack = createStackNavigator();

export default () => {
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, boolean>(({ wallet }) => wallet);

  const initialRouteName: string = useMemo(() => (
    !isInitialized ? 'Setup' :
    !isUnlocked ? 'Login' :
    'HomeNavigation'
  ), []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {isUnlocked ? (
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Setup" component={Setup} />
        </>
      )}
    </Stack.Navigator>
  );
}
