import { StyleSheet } from 'react-native';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    ...mixins.headerText,
    color: theme.color.textHeader,
    fontSize: theme.fontSize.medium,
    marginTop: 8,
    marginBottom: 4,
  },
});
