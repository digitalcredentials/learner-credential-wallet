import { StyleSheet } from 'react-native';

import mixins from '../../styles/mixins';

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 24,
    marginTop: 8,
  },
});
