import { StyleSheet } from 'react-native';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    ...mixins.button,
    justifyContent: 'space-between',
    backgroundColor: theme.color.foregroundPrimary,
    marginVertical: 8,
    paddingHorizontal: 18,
  },
  buttonTitle: {
    fontFamily: theme.fontFamily.medium,
  },
  header: {
    ...mixins.headerText,
    color: theme.color.textHeader,
    fontSize: theme.fontSize.medium,
    marginTop: 8,
    marginBottom: 12,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 24,
  },
});
