import { createDynamicStyleSheet } from '../../dynamicStyles';

export default createDynamicStyleSheet(({ theme, mixins }) => ({
  cardContainer: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  header: {
    ...mixins.headerText,
    color: theme.color.textPrimary,
    fontSize: theme.fontSize.header,
    lineHeight: 30,
    marginBottom: 8,
    flex: 1,
  },
  dataContainer: {
    flexGrow: 1,
    marginVertical: 12,
  },
  dataLabel: {
    fontSize: theme.fontSize.small,
    fontFamily: theme.fontFamily.bold,
    color: theme.color.textPrimary,
    marginBottom: 8,
  },
  dataValue: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
    flex: 1,
  },
  spaceBetween: {
    flex: 1,
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  fullWidthImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  imageBackground: {
    backgroundColor: theme.color.foregroundPrimary,
  },
  dateStyles: {
    flexDirection: 'row',
  }
}));
