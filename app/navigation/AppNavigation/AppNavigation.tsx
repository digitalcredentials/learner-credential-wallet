import React, { useEffect } from 'react';
import { Linking, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
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
import { encodeQueryParams } from '../../lib/encode';

export const navigationRef = createNavigationContainerRef<RootNavigationParamsList>();

const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.backgroundPrimary,
  },
};

function transformDeepLink(url: string): string {
  return encodeQueryParams(url);
}

/**
 * In order to support OAuth redirects, the Android intent filter was set
 * specific to the scheme `dccrequest` and path `request`. If new paths are
 * added here, they must also be added to `android/app/src/main/AndroidManifest.xml`.
 */
const linking = {
  prefixes: ['dccrequest://', 'org.dcconsortium://'],
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
  subscribe: (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('Received URL:', url);
      return listener(transformDeepLink(url));
    };

    Linking.addEventListener('url', onReceiveURL);
    return () => Linking.removeEventListener('url', onReceiveURL);
  },
  getInitialURL: async () => {
    const url = await Linking.getInitialURL();
    console.log('getInitialURL:', url);

    if (url === null) return;

    return transformDeepLink(url);
  },
};


export default function AppNavigation(): JSX.Element | null {
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

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View onLayout={SplashScreen.hideAsync} />
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
