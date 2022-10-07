import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme }) => ({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    // flex: 1,
    // justifyContent: 'space-around',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  credentialList: {
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  },
  paragraph: {
    fontSize: 14,
    color: theme.color.textPrimary,
    marginTop: 8
  },
  sendButton: {
    marginTop: 32,
  },
}));
