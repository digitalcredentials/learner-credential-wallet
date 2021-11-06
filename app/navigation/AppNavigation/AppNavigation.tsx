import React from 'react';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation, SetupNavigation, RootNavigationParamsList } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { useAppLoading } from '../../hooks';
import { RootState } from '../../store';
import { WalletState } from '../../store/slices/wallet';
import { theme } from '../../styles';

export const navigationRef = createNavigationContainerRef<RootNavigationParamsList>();

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.backgroundPrimary,
  },
};

const linking = {
  prefixes: ['dccrequest://'],
  config: {
    screens: {
      HomeNavigation: {
        screens: {
          AddCredentialNavigation: {
            screens: {
              AddScreen: 'request',
            },
          },
        },
      },
    },
  },
};


export default function AppNavigation(): JSX.Element {
  const loading = useAppLoading();
  const { 
    isUnlocked, 
    isInitialized, 
    needsRestart,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  function renderScreen(): JSX.Element | null {
    if (needsRestart) {
      return <RestartScreen />;
    } else if (isUnlocked && isInitialized) {
      return <RootNavigation />;
    } else if (!isUnlocked && isInitialized) {
      return <LoginScreen />;
    } else if (!isUnlocked && !isInitialized) {
      return <SetupNavigation />;
    } else {
      return null;
    }
  }

  if (loading) {
    return <AppLoading />;
  }  

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer
        theme={navigatorTheme}
        ref={navigationRef}
        linking={linking}
      >
        {renderScreen()}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
