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
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.backgroundPrimary,
  },
  imageIcon: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginRight: 12,
    resizeMode: 'contain',
  },

  /* Header mixins */
  headerContainer: { 
    backgroundColor: theme.color.backgroundSecondary, 
    borderBottomWidth: 0,
    zIndex: 1,
  },
  headerTitle: { 
    color: theme.color.textPrimary,
    fontFamily: theme.fontFamily.bold,
    fontSize: theme.fontSize.regular,
  },
  headerIcon: {
    color: theme.color.textPrimary,
    fontSize: theme.iconSize,
    padding: 4,
  },
  headerComponentContainer: {
    justifyContent: 'center',
  },

  /* Typographic mixins */
  headerText: {
    fontFamily: theme.fontFamily.bold,
    color: theme.color.textHeader,
    fontSize: theme.fontSize.medium,
  },
  paragraphText: {
    fontFamily: theme.fontFamily.regular,
    fontSize: theme.fontSize.regular,
    color: theme.color.textSecondary,
    lineHeight: 28,
  },
  
  /* Button mixins */
  button: {
    ...shadow,
    backgroundColor: theme.color.iconActive,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonPrimary: {
    ...shadow,
    backgroundColor: theme.color.buttonPrimary,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonContainer: {
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  buttonSeparator: {
    width: 16,
  },
  buttonTitle: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
    color: theme.color.backgroundSecondary,
  },
  buttonIcon: {
    ...shadow,
    justifyContent: 'space-between',
    backgroundColor: theme.color.foregroundPrimary,
    borderRadius: theme.borderRadius,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  buttonIconTitle: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.medium,
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
