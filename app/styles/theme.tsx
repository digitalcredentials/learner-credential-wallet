import type { ThemeType } from './theme.d';
import { Color } from './colors';
import { FontFamily } from './fonts';

const theme: ThemeType = {
  color: {
    backgroundPrimary: Color.Gray800,
    backgroundSecondary: Color.Gray900,
    foregroundPrimary: Color.Gray700,
    textTitle: Color.LightCyan,
    textPrimary: Color.Gray100,
    textSecondary: Color.Gray300,
    iconActive: Color.White,
    iconInactive: Color.Gray400,
    buttonPrimary: Color.DarkCyan,
  },
  fontFamily: {
    regular: FontFamily.RubikRegular,
    medium: FontFamily.RubikMedium,
    bold: FontFamily.RubikBold,
  },
  fontSize: {
    title: 36,
    medium: 18,
    regular: 16,
  },
  borderRadius: 5,
}

export default theme;
