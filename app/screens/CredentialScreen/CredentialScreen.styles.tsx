import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  menuContainer: {
    top: 0,
    right: -10,
    width: 140,
    borderRadius: 3,
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
  container: {
    padding: 16,
  },
  header: {
    ...mixins.headerText,
    color: theme.color.textPrimary,
    fontSize: theme.fontSize.header,
    lineHeight: 30,
    marginVertical: 8,
  },
  link: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.regular,
    color: theme.color.textPrimary,
    textDecorationLine: 'underline',
  },
  modalBodyText: {
    ...mixins.paragraphText,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  outerContainer: {
    flex: 1,
  },
});
