import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';

import { useSelector, useDispatch } from 'react-redux';

import { RootNavigation, SetupNavigation } from '../';
import { RestartScreen, LoginScreen } from '../../screens';
import { WalletState, pollWalletState, getAllCredentials } from '../../store/slices/wallet';
import { getAllDidRecords } from '../../store/slices/did';
import { RootState } from '../../store';

export default function AppNavigation(): JSX.Element {
  const dispatch = useDispatch();
  const {
    isUnlocked,
    isInitialized,
    needsRestart,
  } = useSelector<RootState, WalletState>(({ wallet }) => wallet);

  const walletStateInitialized = isUnlocked !== null && isInitialized !== null;

  useEffect(() => {
    if (!walletStateInitialized) {
      dispatch(pollWalletState());

      if (isUnlocked) {
        dispatch(getAllCredentials());
        dispatch(getAllDidRecords());
      }
    }
  }, [walletStateInitialized, isUnlocked]);

  if (!walletStateInitialized) {
    return <AppLoading />;
  } else if (needsRestart) {
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
