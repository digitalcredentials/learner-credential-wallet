import React from 'react';
import AppLoading from 'expo-app-loading';

import { useSelector } from 'react-redux';

import { HomeNavigation, SetupNavigation } from '../';
import { LoginScreen } from '../../screens';
import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';

export default function AppNavigation(): JSX.Element {
  const {
    isUnlocked,
    isInitialized,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  if (isUnlocked && isInitialized) {
    return <HomeNavigation />;
  } else if (!isUnlocked && isInitialized) {
    return <LoginScreen />;
  } else if (!isUnlocked && !isInitialized) {
    return <SetupNavigation />;
  } else {
    return <AppLoading />;
  }
}
