import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKey } from '../../lib/asyncStorage';

export async function loadThemeName(): Promise<string | null> {
  return AsyncStorage.getItem(AsyncStorageKey.ThemeName);
}

export async function saveThemeName(themeName: string): Promise<void> {
  return AsyncStorage.setItem(AsyncStorageKey.ThemeName, themeName);
}

