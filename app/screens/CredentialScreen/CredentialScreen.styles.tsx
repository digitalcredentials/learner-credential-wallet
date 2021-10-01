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
});
