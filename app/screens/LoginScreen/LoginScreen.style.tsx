import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import mixins from '../../styles/mixins';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.color.backgroundPrimary,
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
    ...mixins.paragraphText,
    textAlign: 'center',
    marginBottom: 48,
  },
  passwordEntry: {
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    padding: 10,
    width: '100%',
    color: theme.color.textPrimary,
    borderColor: theme.color.textPrimary,
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
    marginTop: 20,
  },
});
