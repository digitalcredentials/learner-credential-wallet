import { createDynamicStyleSheet } from '../../lib/dynamicStyles';

export default createDynamicStyleSheet(({ mixins, theme }) => ({
  container: {
    padding: 16,
    flex: 1,
  },
  paragraph: {
    ...mixins.paragraphText,
    marginBottom: 16,
    marginTop: 8,
  },
  shareButton: {
    ...mixins.buttonPrimary,
  },
  sectionContainer: {
    marginVertical: 4,
  },
  header: {
    ...mixins.headerText,
    fontSize: theme.fontSize.regular,
    marginBottom: 6,
  },
  input: {
    ...mixins.input,
    flex: 1,
    height: 44,
  },
  actionButton: {
    paddingHorizontal: 22,
  },
  actionButtonInactive: {
    backgroundColor: theme.color.foregroundPrimary,
  },
  actionButtonInactiveTitle: {
    color: theme.color.textPrimary,
  },
  actionButtonContainer: {
    marginTop: 5,
    marginLeft: 8,
    flex: 0,
  },
  actionInputContainer: {
    flexDirection: 'row',
  },
}));
