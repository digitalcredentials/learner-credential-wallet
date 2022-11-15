import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme, mixins }) => ({
  container: {
    padding: 16,
    flex: 1,
  },
  credentialList: {
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
    marginTop: 8,
  },
  shareButton: {
    ...mixins.buttonPrimary,
    marginTop: 16,
  },
}));