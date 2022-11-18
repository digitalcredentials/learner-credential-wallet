import React, { useEffect, useMemo, useState } from 'react';
import { AppState, NativeEventEmitter, NativeModules, Platform, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation, SetupNavigation, RootNavigationParamsList } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { useAppLoading, useDynamicStyles } from '../../hooks';
import { selectWalletState } from '../../store/slices/wallet';
import { EventProvider } from 'react-native-outside-press';
import { deepLinkConfig } from '../../lib/deepLink';
import { ConfirmModal, GlobalErrorModal, LoadingIndicatorDots } from '../../components';
import store from '../../store';
import { stageCredentials } from '../../store/slices/credentialFoyer';

let LCWReceiveModule: any;
let CREDENTIAL_RECEIVED_EVENT: string;
let DID_AUTH_RECEIVED_EVENT: string;
let CREDENTIAL: string;
let DID_AUTH: string;

if (Platform.OS === 'android') {
  LCWReceiveModule = NativeModules.LCWReceiveModule;
  const constants = LCWReceiveModule.getConstants();
  CREDENTIAL_RECEIVED_EVENT = constants.CREDENTIAL_RECEIVED_EVENT;
  DID_AUTH_RECEIVED_EVENT = constants.DID_AUTH_RECEIVED_EVENT;
  CREDENTIAL = constants.CREDENTIAL;
  DID_AUTH = constants.DID_AUTH;
}

export const navigationRef = createNavigationContainerRef<RootNavigationParamsList>();

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

  const [dataLoading, setDataLoading] = useState(false);

  const onCredentialReceived = async (event: any) => {
    setDataLoading(true);
    const credentialString = event[CREDENTIAL];
    const credential = JSON.parse(credentialString);
    setDataLoading(false);

    await store.dispatch(stageCredentials([credential]));

    if (navigationRef.isReady()) {
      navigationRef.navigate('AcceptCredentialsNavigation', { screen: 'ChooseProfileScreen' });
    }
  };

  const onDidAuthReceived = async (event: any) => {
    setDataLoading(true);
    const didAuthString = event[DID_AUTH];
    const didAuthRequest = JSON.parse(didAuthString);

    if (navigationRef.isReady()) {
      setDataLoading(false);
      navigationRef.navigate(
        'AcceptCredentialsNavigation',
        {
          screen: 'ChooseProfileScreen',
          params: { did_auth_request: didAuthRequest }
        }
      );
    }
  };

  if (Platform.OS === 'android') {
    const eventEmitter = new NativeEventEmitter(LCWReceiveModule);
    eventEmitter.addListener(
      CREDENTIAL_RECEIVED_EVENT,
      onCredentialReceived
    );
    eventEmitter.addListener(
      DID_AUTH_RECEIVED_EVENT,
      onDidAuthReceived
    );
  
    AppState.addEventListener(
      'change',
      (state) => {
        if (state === 'active') {
          LCWReceiveModule.getData();
        }
      }
    );
  }

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
    return <GlobalErrorModal />;
  }

  return (
    <SafeAreaProvider>
      <View onLayout={SplashScreen.hideAsync} />
      <StatusBar style={theme.statusBarStyle} />
      <GlobalErrorModal />
      <ConfirmModal
        open={Platform.OS === 'android' && dataLoading}
        title={'Retrieving Credential'}
        confirmButton={false}
        cancelButton={false}
      >
        <Text style={mixins.modalBodyText}>
          This will only take a moment.
        </Text>
        <LoadingIndicatorDots />
      </ConfirmModal>
      <EventProvider style={mixins.flex}>
        <NavigationContainer
          theme={navigatorTheme}
          ref={navigationRef}
          linking={deepLinkConfig}
        >
          {renderScreen()}
        </NavigationContainer>
      </EventProvider>
    </SafeAreaProvider>
  );
}
