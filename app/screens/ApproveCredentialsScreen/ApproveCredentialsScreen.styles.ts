import { StyleSheet } from 'react-native';

import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  approveCredentialContainer: {
    paddingHorizontal: 16,
  },
  header: {
    ...mixins.headerText,
    marginTop: 8,
    marginBottom: 4,
  },
  doneButton: {
    backgroundColor: theme.color.transparent,
    padding: 0,
  },
  doneButtonTitle: {
    color: theme.color.textHeader,
  },
});
