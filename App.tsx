import 'react-native-gesture-handler';

import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';

import store from './app/store';
import { pollWalletState, getAllCredentials } from './app/store/slices/wallet';
import theme from './app/styles/theme';
import type { AppNavigation, HomeNavigationParamList } from './app/navigation';

export const navigationRef = createNavigationContainerRef<HomeNavigationParamList>();
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.backgroundPrimary,
  },
};

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_500Medium, Rubik_700Bold  });
  const {
    wallet: {
      isUnlocked,
      isInitialized,
    },
  } = store.getState();
  const walletStateInitialized = isUnlocked !== null && isInitialized !== null;

  useEffect(() => {
    if (!walletStateInitialized) {
      store.dispatch(pollWalletState());
    }
  }, [walletStateInitialized]);

  useEffect(() => {
    if (walletStateInitialized && isUnlocked) {
      store.dispatch(getAllCredentials());
    }
  }, [walletStateInitialized, isUnlocked]);

  if (!fontsLoaded || !walletStateInitialized) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={navigatorTheme} ref={navigationRef}>
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
