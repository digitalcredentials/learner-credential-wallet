import { StyleSheet } from 'react-native';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

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
    flexDirection: 'row',
  },
  listItemTextContainer: {
    flex: 1,
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
