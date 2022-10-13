import React, { useEffect, useMemo } from 'react';
import { Linking, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, LinkingOptions } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation, SetupNavigation, RootNavigationParamsList } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { useAppLoading, useDynamicStyles } from '../../hooks';
import { selectWalletState } from '../../store/slices/wallet';
import { encodeQueryParams } from '../../lib/encode';
import { EventProvider } from 'react-native-outside-press';

export const navigationRef = createNavigationContainerRef<RootNavigationParamsList>();

function transformDeepLink(url: string): string {
  return encodeQueryParams(url);
}

/**
 * In order to support OAuth redirects, the Android intent filter was set
 * specific to the scheme `dccrequest` and path `request`. If new paths are
 * added here, they must also be added to `android/app/src/main/AndroidManifest.xml`.
 */
const linking: LinkingOptions<RootNavigationParamsList> = {
  prefixes: ['dccrequest://', 'org.dcconsortium://'],
  config: {
    screens: {
      AcceptCredentialsNavigation: {
        screens: {
          ChooseProfileScreen: 'request',
        },
      },
    },
  },
  subscribe: (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => listener(transformDeepLink(url));

    const subscription = Linking.addEventListener('url', onReceiveURL);
    return () => subscription.remove();
  },
  getInitialURL: async () => {
    const url = await Linking.getInitialURL();
    if (url === null) return;

    return transformDeepLink(url);
  },
};


export default function AppNavigation(): JSX.Element | null {
  const { mixins, theme } = useDynamicStyles();

  const navigatorTheme = useMemo(() => ({
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.color.backgroundPrimary,
    },
  }), [theme]);

  const loading = useAppLoading();
  const {
    isUnlocked,
    isInitialized,
    needsRestart,
  } = useSelector(selectWalletState);

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
      <StatusBar style={theme.statusBarStyle} />
      <EventProvider style={mixins.flex}>
        <NavigationContainer
          theme={navigatorTheme}
          ref={navigationRef}
          linking={linking}
        >
          {renderScreen()}
        </NavigationContainer>
      </EventProvider>
    </SafeAreaProvider>
  );
}
