import React, { useMemo } from 'react';

import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from '../HomeNavigation/HomeNavigation';
import { SetupScreen, LoginScreen } from '../../screens';
import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';

const Stack = createStackNavigator();

export default function AppNavigation(): JSX.Element {
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

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
