import { StyleSheet } from 'react-native';
import { theme, mixins } from '../../styles';
import styles from './CredentialCard.styles';
import { Color } from '../../styles/colors';

export default StyleSheet.create({
  studentPhoto: {
    width: '100%',
    height: 200,
  },
  barcodeContainer: {
    padding: 20,
    backgroundColor: Color.White,
  },
  barcode: {
    width: '100%',
    height: 50,
  },
});
