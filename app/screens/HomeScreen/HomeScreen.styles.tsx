import { StyleSheet } from 'react-native';
import { mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    ...mixins.headerText,
    marginTop: 8,
    marginBottom: 4,
  },
});
