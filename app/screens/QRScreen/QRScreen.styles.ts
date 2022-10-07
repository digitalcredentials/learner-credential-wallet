import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme, mixins }) => ({
  scannerBody: {
    flex: 1,
    backgroundColor: theme.color.backgroundPrimary,
  },
  instructionContainer: {
    height: 50,
    backgroundColor: theme.color.backgroundPrimary,
    zIndex: 1,
  },
  instructionText: {
    ...mixins.paragraphText,
    paddingHorizontal: 16,
    width: '100%',
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
}));
