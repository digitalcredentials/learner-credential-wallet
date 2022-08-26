import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    padding: 16,
    flex: 1,
  },
  listHeader: {
    marginVertical: 8,
  },
  input: {
    ...mixins.input,
    backgroundColor: theme.color.foregroundPrimary,
  },
});
