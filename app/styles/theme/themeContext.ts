import { createContext } from 'react';
import { ThemeType } from '.';

export type ThemeContextValue = {
  theme: ThemeType,
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
