import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import mixins from '../../styles/mixins';

export default StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.75,
    backgroundColor: theme.color.backgroundSecondary,
  },
  modalOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: theme.color.foregroundPrimary,
    padding: 16,
    alignItems: 'center',
    borderRadius: theme.borderRadius,
  },
  modalTitle: {
    color: theme.color.textPrimary,
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.regular,
    marginVertical: 8,
  },
  buttonGroupContainer: {
    marginTop: 16,
  },
  buttonPrimary: {
    ...mixins.button, 
    ...mixins.buttonPrimary,
  },
  buttonSecondary: {
    ...mixins.button,
    backgroundColor: theme.color.buttonSecondary,
  },
  buttonSecondaryTitle: {
    ...mixins.buttonTitle,
    color: theme.color.textPrimary,
  },
});
