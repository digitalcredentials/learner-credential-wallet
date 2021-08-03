import { Color } from './colors';
import { FontFamily } from './fonts';

export type ThemeType = {
  color: {
    backgroundPrimary: Color;
    backgroundSecondary: Color;
    foregroundPrimary: Color;
    textTitle: Color;
    textPrimary: Color;
    textSecondary: Color;
    iconActive: Color;
    iconInactive: Color;
    buttonPrimary: Color;
  };
  fontFamily: {
    regular: FontFamily;
    medium: FontFamily;
    bold: FontFamily;
  };
  fontSize: {
    title: number;
    medium: number;
    regular: number;
  };
  borderRadius: number;
}
