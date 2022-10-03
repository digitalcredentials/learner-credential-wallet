import { Appearance } from 'react-native';

import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

const defaultTheme = darkTheme;
const colorSchemeTheme = {
  'light': lightTheme,
  'dark': darkTheme,
};

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme 
  ? colorSchemeTheme[colorScheme] 
  : defaultTheme;

export default theme;
