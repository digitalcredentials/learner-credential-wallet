import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ theme, mixins }) => ({
  container: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerText: {
    ...mixins.headerText,
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    marginVertical: 8,
  },
  bulletText: {
    ...mixins.paragraphText,
    marginRight: 16,
    marginLeft: 8,
  },
  statusItem: {
    flexDirection: 'row',
    marginVertical: 8
  },
  bulletContainer: {
    marginTop: 5,
    marginRight: 8,
  },
  bodyText: {
    ...mixins.paragraphText,
    marginVertical: 8,
    lineHeight: 22,
  }
}));
