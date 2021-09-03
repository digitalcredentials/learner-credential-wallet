import { StyleSheet } from 'react-native';

import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  scannerBody: {
    flex: 1,
    backgroundColor: theme.color.backgroundPrimary,
  },
  instructionContainer: {
    height: 50,
    backgroundColor: theme.color.backgroundPrimary,
  },
  instructionText: {
    ...mixins.headerTitle,
    fontFamily: theme.fontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    flex: 0,
  },
  cameraStyle: {
    flex: 1,
    flexBasis: '80%',
    height: '100%',
  },
  markerStyle: {
    borderColor: theme.color.textPrimary,
  },
  emptyContainer: {
    height: 0,
    flex: 0,
  },
});
