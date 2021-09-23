import { StyleSheet } from 'react-native';

import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  paragraph: {
    ...mixins.paragraphText,
  },
  codeBlock: {
    color: theme.color.textPrimary,
    backgroundColor: theme.color.backgroundSecondary,
    padding: 10,
    fontFamily: theme.fontFamily.mono,
    marginBottom: 16,
  },
  exitButton: {
    backgroundColor: theme.color.transparent,
    padding: 0,
  },
  exitButtonTitle: {
    color: theme.color.textHeader,
  },
});
