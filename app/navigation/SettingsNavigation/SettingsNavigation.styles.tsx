import { StyleSheet } from 'react-native';

import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.color.backgroundPrimary,
  },
  settingsContainer: {
    backgroundColor: theme.color.backgroundPrimary,
    padding: 16,
  },
  settingsContainer: {
    backgroundColor: theme.color.backgroundPrimary,
  },
  listItemTitle: {
    color: theme.color.textSecondary,
    paddingTop: 8,
    paddingBottom: 8,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 24,
    marginTop: 8,
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
  image: {
    height: 72,
    resizeMode: 'contain',
    marginTop: 30,
  },
  link: {
    color: theme.color.linkColor,
  },
  title: {
    ...mixins.headerText,
  },
  paragraph: {
    ...mixins.paragraphText,
    fontSize: theme.fontSize.medium,
    textAlign: 'center',
    marginTop: 30,
  },
});
