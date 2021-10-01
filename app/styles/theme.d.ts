import { Color } from './colors';
import { FontFamily } from './fonts';

export type ThemeType = {
  color: {
    linkColor: Color;
    backgroundPrimary: Color;
    backgroundSecondary: Color;
    foregroundPrimary: Color;
    textHeader: Color;
    textPrimary: Color;
    textSecondary: Color;
    textPrimaryDark: Color;
    iconActive: Color;
    iconInactive: Color;
    buttonPrimary: Color;
    buttonSecondary: Color;
    buttonDisabled: Color;
    shadow: Color;
    success: Color;
    error: Color;
    transparent: Color;
  };
  fontFamily: {
    regular: FontFamily;
    medium: FontFamily;
    bold: FontFamily;
    mono: FontFamily;
  };
  fontSize: {
    title: number;
    header: number;
    medium: number;
    regular: number;
    small: number;
  };
  borderRadius: number;
  iconSize: number;
}
