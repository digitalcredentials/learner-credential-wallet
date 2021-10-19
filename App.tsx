import 'react-native-gesture-handler';

import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

import store from './app/store';
import { theme } from './app/styles';
import { AppNavigation, RootNavigationParamsList } from './app/navigation';

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

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer
          theme={navigatorTheme}
          ref={navigationRef}
          linking={linking}
        >
          <AppNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}
