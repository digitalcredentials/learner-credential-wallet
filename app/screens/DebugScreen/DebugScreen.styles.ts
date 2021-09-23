import { StyleSheet } from 'react-native';

import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
  },
  codeBlock: {
    color: theme.color.textPrimary,
    backgroundColor: theme.color.backgroundSecondary,
    padding: 10,
    fontFamily: theme.fontFamily.mono,
  },
});
