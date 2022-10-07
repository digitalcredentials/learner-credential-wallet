import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme, mixins }) => ({
  container: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    paddingRight: 40,
    justifyContent: 'space-between',
  },
  headerText: {
    ...mixins.headerText,
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    marginTop: 8,
  },
  bodyText: {
    ...mixins.paragraphText,
    marginRight: 16,
    marginLeft: 8,
  },
  statusItem: {
    flexDirection: 'row',
    marginTop: 16
  },
  bulletContainer: {
    marginTop: 5,
    marginRight: 8,
  },
}));
