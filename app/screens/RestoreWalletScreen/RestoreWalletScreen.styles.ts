import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paragraph: {
    ...mixins.paragraphText,
    fontSize: theme.fontSize.medium,
    marginVertical: 8,
  },
  underline: {
    textDecorationLine: 'underline',
  }
});
