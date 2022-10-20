import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

import {
  pollWalletState,
  lock,
  selectWalletState,
} from '../store/slices/wallet';
import { getAllRecords } from '../store';
import { useAppDispatch } from './useAppDispatch';
import { loadRemoteRegistries } from '../lib/registry';

export function useAppLoading(): boolean {
  const [loading, setLoading] = useState(true);

  const primaryTasks = [
    useFontsLoaded(),
    useWalletStateInitialized(),
  ];

  const primaryTasksFinished = useMemo(() => primaryTasks.every(t => t), primaryTasks);

  useEffect(() => { 
    if (primaryTasksFinished) runSecondaryTasks();
  }, [primaryTasksFinished]);

  async function runSecondaryTasks() {
    await Promise.all([
      loadRemoteRegistries(),
    ]);

    setLoading(false);
  }

  return loading;
}

function useFontsLoaded() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
    Roboto_400Regular,
  });

  return fontsLoaded;
}

function useWalletStateInitialized() {
  const dispatch = useAppDispatch();

  const { isUnlocked, isInitialized } = useSelector(selectWalletState);
  const walletStateInitialized = isUnlocked !== null && isInitialized !== null;

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
        dispatch(getAllRecords());
      }
    }
  }, [walletStateInitialized]);

  return walletStateInitialized;
}
