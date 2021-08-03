import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.backgroundPrimary,
    padding: 16,
  },
  image: {
    height: 72,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.title,
    color: theme.color.textPrimary,
    padding: 16,
  },
  paragraph: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.medium,
    color: theme.color.textSecondary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 48,
  },
  buttonPrimary: {
    backgroundColor: theme.color.buttonPrimary,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonPrimaryTitle: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    color: theme.color.backgroundSecondary,
  },
  buttonPrimaryContainer: {
    width: '100%',
  },
});
