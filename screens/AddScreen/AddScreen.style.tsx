import { StyleSheet } from 'react-native';
import Theme from '../../style/colors';

export default StyleSheet.create({
  headerTitle: { 
    color: Theme.textPrimary
  },
  headerContainer: { 
    backgroundColor: Theme.backgroundSecondary, 
    borderBottomWidth: 0,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgroundPrimary,
  }
})