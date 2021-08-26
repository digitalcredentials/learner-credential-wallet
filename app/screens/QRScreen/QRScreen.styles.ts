import { StyleSheet, Dimensions } from 'react-native';

import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

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
