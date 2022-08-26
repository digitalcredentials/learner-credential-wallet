import { StyleSheet } from 'react-native';
import { mixins, theme } from '../../styles';

export default StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.color.backgroundPrimary,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  header: {
    ...mixins.headerText,
    fontSize: theme.fontSize.regular,
  },
  bulletItem: {
    ...mixins.paragraphText,
    fontSize: theme.fontSize.regular,
    marginBottom: -4,
  },
});
