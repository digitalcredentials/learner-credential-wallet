import type { ThemeType } from '..';
import { Color } from '../../colors';
import { FontFamily } from '../../fonts';
import { StatusBarStyle } from '../../statusBarStyle';

export const lightTheme: ThemeType = {
  name: 'LightTheme',
  color: {
    linkColor: Color.Blue,
    backgroundPrimary: Color.Gray100,
    backgroundSecondary: Color.White,
    foregroundPrimary: Color.White,
    textHeader: Color.Blue,
    textPrimary: Color.Gray700,
    brightAccent: Color.Blue,
    textSecondary: Color.Gray700,
    textPrimaryDark: Color.White,
    iconActive: Color.Gray700,
    iconInactive: Color.Gray500,
    inputInactive: Color.Gray600,
    buttonPrimary: Color.Blue,
    buttonSecondary: Color.Gray300,
    buttonDisabled: Color.Gray500,
    shadow: Color.Black,
    success: Color.DarkGreen,
    error: Color.Red,
    errorLight: Color.DarkRed,
    transparent: Color.Transparent,
    switchActive: Color.DarkCyan,
    modalBackground: Color.Gray400,
  },
  fontFamily: {
    regular: FontFamily.RubikRegular,
    medium: FontFamily.RubikMedium,
    bold: FontFamily.RubikBold,
    mono: FontFamily.RobotoRegular,
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
  issuerIconSize: 40,
  statusBarStyle: StatusBarStyle.Dark,
  shadowOpacity: 0.1,
};