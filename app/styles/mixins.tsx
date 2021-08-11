import { StyleSheet } from 'react-native';
import theme from './theme';

const shadow = {
  shadowColor: theme.color.shadow,
  shadowOpacity: 0.15,
  shadowRadius: 15,
  shadowOffset: {
    height: 5,
    width: 0,
  },
};

export default StyleSheet.create({
  shadow,
  headerContainer: { 
    backgroundColor: theme.color.backgroundSecondary, 
    borderBottomWidth: 0,
  },
  headerTitle: { 
    color: theme.color.textPrimary,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.backgroundPrimary,
  },
  
  /* Button mixins */
  button: {
    ...shadow,
    backgroundColor: theme.color.iconActive,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    color: theme.color.backgroundSecondary,
  },

  /* Input mixins */
  input: {
    height: 48,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.borderRadius,
    paddingHorizontal: 16,
    color: theme.color.textPrimary,
    borderColor: theme.color.textPrimary,
    fontSize: theme.fontSize.regular,
  },
});
