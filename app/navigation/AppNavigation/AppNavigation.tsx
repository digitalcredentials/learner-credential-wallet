import React from 'react';
import { View } from 'react-native';

import { useSelector } from 'react-redux';

import HomeNavigation from '../HomeNavigation/HomeNavigation';
import { SetupScreen, LoginScreen } from '../../screens';
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
    return <SetupScreen />;
  } else {
    return <View />;
  }
}
