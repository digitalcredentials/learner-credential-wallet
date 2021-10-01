import { StyleSheet } from 'react-native';

import { mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
    flex: 1,
  },
  credentialList: {
    flex: 1,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
    marginTop: 0,
  },
  shareButton: {
    ...mixins.buttonPrimary,
    marginBottom: 10,
  },
});
