import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

import type { RootState } from '../store';
import {
  WalletState,
  pollWalletState,
  getAllCredentials,
  lock,
} from '../store/slices/wallet';
import { getAllDidRecords } from '../store/slices/did';

export function useAppLoading(): boolean {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { isUnlocked, isInitialized } = useSelector<RootState, WalletState>(
    ({ wallet }) => wallet,
  );

  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Roboto_400Regular,
  });

  const walletStateInitialized = isUnlocked !== null && isInitialized !== null;
  const finishedLoading = walletStateInitialized && fontsLoaded;

  useEffect(() => {
    if (finishedLoading) {
      setLoading(false);
    }
  }, [finishedLoading]);

  useEffect(() => {
    if (!walletStateInitialized) {
      dispatch(pollWalletState());
    } else {
      /**
       * SecureStore items aren't removed when the app is deleted, so if the 
       * database status is unlocked but not initialized, we need to update the
       * status to locked.
       */
      if (isUnlocked && !isInitialized) {
        dispatch(lock());
      } else if (isUnlocked) {
        dispatch(getAllCredentials());
        dispatch(getAllDidRecords());
      }
    }
  }, [walletStateInitialized]);

  return loading;
}
