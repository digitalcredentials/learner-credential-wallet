import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
  password: {
    ...mixins.input,
    backgroundColor: theme.color.foregroundPrimary,
  }
});
