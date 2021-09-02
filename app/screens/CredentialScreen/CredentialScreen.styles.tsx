import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  menuContainer: {
    top: 42,
    right: -10,
    width: 140,
    borderRadius: 3,
    position: 'absolute',
    overflow: 'hidden',
  },
  container: {
    padding: 16,
  },
  header: {
    ...mixins.headerText,
    fontSize: theme.fontSize.header,
    lineHeight: 30,
    marginVertical: 8,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  proofContainer: {
    backgroundColor: theme.color.backgroundSecondary,
    borderRadius: theme.borderRadius,
    marginVertical: 8,
    padding: 16,
  },
  proofText: {
    marginHorizontal: 14,
  },
  modalBodyText: {
    ...mixins.paragraphText,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 8,
  },
});
