import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';

export default StyleSheet.create({
  listItemContainer: {
    ...mixins.button,
    backgroundColor: theme.color.foregroundPrimary,
  },
  listItemOuterContainer: {
    marginVertical: 8,
    borderRadius: mixins.button.borderRadius,
  },
  listItemContentContainer: {
    flexDirection: 'column',
  },
  listItemTextContainer: {
    flex: 1,
  },
  listItemTopContent: {
    flexDirection: 'row',
  },
  listItemTitle: {
    color: theme.color.textPrimary,
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    marginBottom: 8,
  },
  listItemSubtitle: {
    color: theme.color.textSecondary,
    fontFamily: theme.fontFamily.regular,
    fontSize: 14,
  },
});
