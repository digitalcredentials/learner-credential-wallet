import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

export const defaultTheme = darkTheme;

export const themes = {
  darkTheme,
  lightTheme,
};
import { ThemeType } from './index.d';

export type { ThemeType } from './index.d';

export * from './themeName';
export * from './themeContext';

/* Temporary static definition */
export default defaultTheme;
export function findThemeBy(themeName: string | null): ThemeType | null {
  if (themeName === null) {
    return null;
  }

  return Object.values(themes).find(({ name }) => name === themeName) || null;
}
