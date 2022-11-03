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
  statusItem: {
    flexDirection: 'row',
    marginVertical: 8
  },
  statusItemContent: {
    marginRight: 16,
    marginLeft: 8,
  },
  statusItemLabel: {
    ...mixins.paragraphText,
  },
  bodyText: {
    ...mixins.paragraphText,
    marginVertical: 8,
    lineHeight: 22,
  }
}));
