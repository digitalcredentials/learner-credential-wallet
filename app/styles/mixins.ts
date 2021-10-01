import { StyleSheet, ViewStyle } from 'react-native';
import theme from './theme';

const shadow = {
  overflow: 'visible' as ViewStyle['overflow'],
  elevation: 5,
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
    lineHeight: 24,
  },
  
  /* Button mixins */
  button: {
    backgroundColor: theme.color.iconActive,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonPrimary: {
    backgroundColor: theme.color.buttonPrimary,
    padding: 16,
    borderRadius: theme.borderRadius,
  },
  buttonContainer: {
    ...shadow,
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
    justifyContent: 'space-between',
    backgroundColor: theme.color.foregroundPrimary,
    borderRadius: theme.borderRadius,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  buttonIconContainer: {
    ...shadow,
    marginVertical: 8,
  },
  buttonIconTitle: {
    fontFamily: theme.fontFamily.medium,
    fontSize: theme.fontSize.regular,
  },

  /* Input mixins */
  input: {
    fontSize: theme.fontSize.regular,
    backgroundColor: theme.color.backgroundPrimary,
  },
});
