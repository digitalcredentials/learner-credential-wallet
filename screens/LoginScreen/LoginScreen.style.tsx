import { StyleSheet } from 'react-native';

import Theme from '../../style/colors';
import { FontStyle } from '../../style/fonts';

export default StyleSheet.create({
  container: {
    backgroundColor: Theme.backgroundPrimary,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    height: 72,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: FontStyle.Bold,
    fontSize: 36,
    color: Theme.textPrimary,
    padding: 16,
  },
  paragraph: {
    fontFamily: FontStyle.Regular,
    fontSize: 18,
    color: Theme.textSecondary,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 48,
  },
  passwordEntry: {
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    color: Theme.textPrimary,
    borderColor: Theme.textPrimary,
  },
  buttonPrimary: {
    backgroundColor: Theme.buttonPrimary,
    padding: 16,
    borderRadius: 5,
  },
  buttonPrimaryTitle: {
    fontFamily: FontStyle.Medium,
    fontSize: 16,
    color: Theme.backgroundSecondary,
  },
  buttonPrimaryContainer: {
    width: '100%',
    marginTop: 20,
  },
});