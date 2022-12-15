import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_700Bold,
} from '@expo-google-fonts/rubik';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { loadRegistryCollections } from '@digitalcredentials/issuer-registry-client';
import { FileLogger, LogLevel, logLevelNames } from 'react-native-file-logger';

import {
  pollWalletState,
  lock,
  selectWalletState,
} from '../store/slices/wallet';
import { getAllRecords } from '../store';
import { useAppDispatch } from './useAppDispatch';

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
      loadRegistryCollections(),
      initializeLogger(),
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
    RobotoMono_400Regular,
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

async function initializeLogger() {
  function formatter(level: LogLevel, msg: string) {
    const levelName = logLevelNames[level];
    return `> ${new Date().toISOString()} [${levelName}] ${msg}`;
  }

  await FileLogger.configure({ formatter, maximumNumberOfFiles: 1 });
}
