import { StyleSheet } from 'react-native';
import { theme} from '../../styles';

export default StyleSheet.create({
  container: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    marginHorizontal: 2,
    height: 20,
    marginBottom: 4,
  },
  icon: {
    marginRight: 4,
    marginLeft: -5,
  },
  label: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.small,
    letterSpacing: 0.3,
  }
});
