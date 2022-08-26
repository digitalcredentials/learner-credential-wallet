import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
    marginTop: 8,
  },
  underline: {
    textDecorationLine: 'underline',
  },
  password: {
    ...mixins.input,
    backgroundColor: theme.color.foregroundPrimary,
  }
});
