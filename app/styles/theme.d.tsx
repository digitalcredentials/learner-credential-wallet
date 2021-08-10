import { Color } from './colors';
import { FontFamily } from './fonts';

export type ThemeType = {
  color: {
    backgroundPrimary: Color;
    backgroundSecondary: Color;
    foregroundPrimary: Color;
    textHeader: Color;
    textPrimary: Color;
    textSecondary: Color;
    iconActive: Color;
    iconInactive: Color;
    buttonPrimary: Color;
    buttonDisabled: Color;
    shadow: Color;
    success: Color;
    error: Color;
  };
  fontFamily: {
    regular: FontFamily;
    medium: FontFamily;
    bold: FontFamily;
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
