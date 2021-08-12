import { StyleSheet } from 'react-native';

import theme from '../../styles/theme';

export default StyleSheet.create({
  bodyContainer: {
    backgroundColor: theme.color.backgroundPrimary,
  },
  listItemTitle: {
    color: theme.color.textSecondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  listItemContainer: {
    backgroundColor: theme.color.backgroundPrimary,
    borderBottomColor: theme.color.backgroundSecondary,
    borderBottomWidth: 3,
  },
  buttonStyle: {
    backgroundColor: theme.color.transparent,
  },
  iconStyle: {
    color: theme.color.textPrimary,
    position: 'absolute',
    paddingLeft: 5,
  },
});
