import React from 'react';
import AppLoading from 'expo-app-loading';

import { useSelector } from 'react-redux';

import { RootNavigation, SetupNavigation } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { WalletState } from '../../store/slices/wallet';
import { RootState } from '../../store';

export default function AppNavigation(): JSX.Element {
  const {
    isUnlocked,
    isInitialized,
    needsRestart,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  if (needsRestart) {
    return <RestartScreen />;
  } else if (isUnlocked && isInitialized) {
    return <RootNavigation />;
  } else if (!isUnlocked && isInitialized) {
    return <LoginScreen />;
  } else if (!isUnlocked && !isInitialized) {
    return <SetupNavigation />;
  } else {
    return <AppLoading />;
  }
}
