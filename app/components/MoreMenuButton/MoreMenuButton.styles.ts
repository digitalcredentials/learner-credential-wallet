import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme }) => ({
  buttonContainer: {
    padding: 2,
    borderRadius: theme.borderRadius,
  },
  buttonContainerActive: {
    backgroundColor: theme.color.backgroundPrimary,
    zIndex: 2,
  },
  menuContainer: {
    top: '100%',
    right: 0,
    width: 140,
    borderRadius: theme.borderRadius,
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
}));
