import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  loadingDots: {
    marginTop: -100,
    fontSize: 130,
    letterSpacing: -15,
    color: theme.color.textHeader,
  },
  loadingContainer: {
    marginLeft: -10,
    marginBottom: -20,
    alignItems: 'center',
  },
  modalText: {
    ...mixins.paragraphText,
    lineHeight: 24,
    marginVertical: 8,
    textAlign: 'center',
  },
});
