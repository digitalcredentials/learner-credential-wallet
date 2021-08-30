import type { StackScreenProps } from '@react-navigation/stack';

export type ShareNavigationParamsList = {
  ShareHomeScreen: undefined;
  PresentationPreviewScreen: undefined;
  ShareCredentialPreviewScreen: undefined;
};

export type ShareHomeScreenProps = StackScreenProps<ShareNavigationParamsList, 'ShareHomeScreen'>;
export type PresentationPreviewScreenProps = StackScreenProps<ShareNavigationParamsList, 'PresentationPreviewScreen'>;
export type ShareCredentialPreviewScreenProps = StackScreenProps<ShareNavigationParamsList, 'ShareCredentialPreviewScreen'>;
