import { StyleSheet } from 'react-native';
import { theme } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  footerText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.small,
    color: theme.color.textSecondary,
    lineHeight: 18,
    marginTop: 16,
  },
});
