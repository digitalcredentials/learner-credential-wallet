import { StyleSheet } from 'react-native';
import mixins from '../../styles/mixins';

export default StyleSheet.create({
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 24,
    marginTop: 8,
  },
});
