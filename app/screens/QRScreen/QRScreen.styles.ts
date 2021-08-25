import { StyleSheet, Dimensions } from 'react-native';

import theme from '../../styles/theme';

export default StyleSheet.create({
  cameraStyle: {
    height: Dimensions.get('window').height,
  },
  markerStyle: {
    borderColor: theme.color.textPrimary,
  },
  emptyContainer: {
    height: 0,
    flex: 0,
  },
});
