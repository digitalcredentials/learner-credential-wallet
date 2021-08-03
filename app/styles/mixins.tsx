import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  headerContainer: { 
    backgroundColor: theme.color.backgroundSecondary, 
    borderBottomWidth: 0,
  },
  headerTitle: { 
    color: theme.color.textPrimary
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.backgroundPrimary,
  }
});
