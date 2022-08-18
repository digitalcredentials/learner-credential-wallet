import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  header: {
    ...mixins.headerText,
    marginTop: 8,
    marginBottom: 4,
  },
  container: {
    padding: 16,
    flex: 1,
  },
  doneButton: {
    backgroundColor: theme.color.transparent,
    padding: 0,
    alignItems: 'center',
  },
  doneButtonTitle: {
    lineHeight: 17,
    color: theme.color.textHeader,
    fontSize: theme.fontSize.regular,
  },
  profileText: {
    ...mixins.paragraphText,
  },
  profileTextBold: {
    fontFamily: theme.fontFamily.bold,
  },
  listHeader: {
    marginVertical: 8,
  },
});
