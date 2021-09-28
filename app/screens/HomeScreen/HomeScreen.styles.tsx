import { StyleSheet } from 'react-native';
import { mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  header: {
    ...mixins.headerText,
    marginTop: 8,
    marginBottom: 16,
  },
});
