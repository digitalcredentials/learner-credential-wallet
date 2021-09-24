import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  header: {
    ...mixins.headerText,
    color: theme.color.textPrimary,
    fontSize: theme.fontSize.header,
    lineHeight: 30,
    marginVertical: 8,
  },
  credentialContainer: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginVertical: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dataContainer: {
    flexGrow: 1,
    marginVertical: 12,
  },
  dataImage: {
    ...mixins.imageIcon,
    width: 48,
    height: 48,
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
  },
  link: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
    textDecorationLine: 'underline',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
