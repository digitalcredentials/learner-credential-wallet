import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: 16,
    flex: 1,
  },
  input: {
    ...mixins.input,
    backgroundColor: theme.color.foregroundPrimary,
  },
});
