import type { StackScreenProps } from '@react-navigation/stack';

import type { CredentialObject } from '../../model/dao/Credential';

export type ShareNavigationParamsList = {
  ShareHomeScreen: undefined;
  PresentationPreviewScreen: {
    selectedCredentials: CredentialObject[];
  };
  CredentialScreen: {
    credentialObject: CredentialObject;
    noShishKabob: boolean;
  };
};

export type ShareHomeScreenProps = StackScreenProps<ShareNavigationParamsList, 'ShareHomeScreen'>;
export type PresentationPreviewScreenProps = StackScreenProps<ShareNavigationParamsList, 'PresentationPreviewScreen'>;
export type CredentialScreenShareProps = StackScreenProps<ShareNavigationParamsList, 'CredentialScreen'>;
