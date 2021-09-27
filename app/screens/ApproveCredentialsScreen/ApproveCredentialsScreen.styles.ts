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
  credentialStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginVertical: 8,
    padding: 16,
  },
  statusText: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
  },
});
