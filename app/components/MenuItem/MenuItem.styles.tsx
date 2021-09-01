import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export default StyleSheet.create({
  menuItemTitle: {
    color: theme.color.textPrimary,
  },
  menuItemContainer: {
    backgroundColor: theme.color.foregroundPrimary,
    borderBottomColor: theme.color.backgroundPrimary,
    borderBottomWidth: 2,
    padding: 20,
  },
});
