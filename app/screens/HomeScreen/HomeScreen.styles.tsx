import { StyleSheet } from 'react-native';
import { mixins } from '../../styles';

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  header: {
    ...mixins.headerText,
    marginTop: 8,
    marginBottom: 8,
  },
  swipeItemOuter: {
    ...mixins.shadow,
  },
  swipeItem: {
    overflow: 'hidden',
  },
  swipeButtonContainer: {
    flex: 1,
  },
  swipeButton: {
    ...mixins.buttonIcon,
    flex: 1,
  },
  modalBodyText: {
    ...mixins.paragraphText,
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 8,
  },
  noShadow: {
    shadowOpacity: 0,
    elevation: 0,
  }
});
