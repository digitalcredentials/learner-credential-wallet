import { StyleSheet } from 'react-native';

import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  credentialStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginVertical: 8,
    width: '100%',
    height: 40,
  },
  statusText: {
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
    paddingLeft: 8,
  },
  approvalContainer: {
    ...mixins.buttonGroup,
    marginTop: 8,
  },
  acceptButton: {
    ...mixins.button, 
    ...mixins.buttonPrimary,
    margin: 8,
    width: '47%',
    height: 40,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  declineButton: {
    ...mixins.button,
    backgroundColor: theme.color.buttonSecondary,
    margin: 8,
    width: '47%',
    height: 40,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brightActionText: {
    color: theme.color.textPrimary,
    fontFamily: theme.fontFamily.medium,
  },
  darkActionText: {
    color: theme.color.textPrimaryDark,
    fontFamily: theme.fontFamily.medium,
  },
});
