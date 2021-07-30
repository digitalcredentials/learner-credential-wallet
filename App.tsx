import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Rubik_400Regular, Rubik_500Medium, Rubik_700Bold } from '@expo-google-fonts/rubik';

import AppNavigation from './navigation/AppNavigation';

const walletIsInitialized = true;
const isLoggedIn = false;

export default function App() {
  const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_500Medium, Rubik_700Bold  }); 
  const [initialRouteName, setInitialRouteName] = useState('');

  const loading = !fontsLoaded || initialRouteName === '';

  useState(() => {
    if (!walletIsInitialized) {
      setInitialRouteName('Setup');
    } else if (!isLoggedIn) {
      // TODO: Add login
      setInitialRouteName('HomeNavigation');
    } else {
      setInitialRouteName('HomeNavigation');
    }
  });

  if (loading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <AppNavigation initialRouteName={initialRouteName} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
