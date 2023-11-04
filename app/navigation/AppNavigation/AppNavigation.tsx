import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ReactHooksWrapper, setHook } from 'react-hooks-outside';

import { RootNavigation, SetupNavigation, RootNavigationParamsList } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { useAppLoading, useDynamicStyles, useLCWReceiveModule, useSelectedExchangeCredentials } from '../../hooks';
import { selectWalletState } from '../../store/slices/wallet';
import { EventProvider } from 'react-native-outside-press';
import { deepLinkConfig } from '../../lib/deepLink';
import { GlobalConfirmModal } from '../../components';

export const navigationRef = createNavigationContainerRef<RootNavigationParamsList>();

// Enable global access to hooks
setHook('selectedExchangeCredentials', useSelectedExchangeCredentials);

export default function AppNavigation(): JSX.Element | null {
  const { mixins, theme } = useDynamicStyles();
  useLCWReceiveModule();

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
    return <GlobalConfirmModal />;
  }

  return (
    <SafeAreaProvider>
      <View onLayout={SplashScreen.hideAsync} />
      <StatusBar style={theme.statusBarStyle} />
      <GlobalConfirmModal />
      <EventProvider style={mixins.flex}>
        <NavigationContainer
          theme={navigatorTheme}
          ref={navigationRef}
          linking={deepLinkConfig}
        >
          <ReactHooksWrapper />
          {renderScreen()}
        </NavigationContainer>
      </EventProvider>
    </SafeAreaProvider>
  );
}
