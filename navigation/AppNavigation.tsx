import React from 'react';

import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import Setup from '../components/routes/setup';
import Login from '../components/routes/login';
import { RootState } from '../store';

const Stack = createStackNavigator();

export default () => {
  const isLoggedIn = useSelector<RootState, boolean>(({ loginState }) => loginState.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      {isLoggedIn ? (
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
