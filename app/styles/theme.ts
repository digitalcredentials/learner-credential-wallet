import type { ThemeType } from './theme.d';
import { Color } from './colors';
import { FontFamily } from './fonts';

const theme: ThemeType = {
  color: {
    linkColor: Color.DarkCyan,
    backgroundPrimary: Color.Gray800,
    backgroundSecondary: Color.Gray900,
    foregroundPrimary: Color.Gray700,
    textHeader: Color.LightCyan,
    textPrimary: Color.Gray100,
    textSecondary: Color.Gray300,
    iconActive: Color.White,
    iconInactive: Color.Gray400,
    buttonPrimary: Color.DarkCyan,
    buttonSecondary: Color.Gray600,
    buttonDisabled: Color.Gray500,
    shadow: Color.Black,
    success: Color.Green,
    error: Color.Red,
    transparent: Color.Transparent,
  },
  fontFamily: {
    regular: FontFamily.RubikRegular,
    medium: FontFamily.RubikMedium,
    bold: FontFamily.RubikBold,
  },
  fontSize: {
    title: 36,
    header: 24,
    medium: 18,
    regular: 16,
    small: 12,
  },
  borderRadius: 5,
  iconSize: 24,
};

export default theme;
