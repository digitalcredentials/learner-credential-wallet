import type { StackScreenProps } from '@react-navigation/stack';

import type { CredentialRecordRaw } from '../../model/credential';
import { PublicLinkScreenParams, CredentialSelectionScreenParams } from '../../screens';

export type ShareNavigationParamsList = {
  ShareHomeScreen: undefined;
  PresentationPreviewScreen: {
    selectedCredentials: CredentialRecordRaw[];
  };
  CredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw;
    noShishKabob?: boolean;
  };
  CredentialSelectionScreen: CredentialSelectionScreenParams;
  PublicLinkScreen: PublicLinkScreenParams
};

export type ShareHomeScreenProps = StackScreenProps<ShareNavigationParamsList, 'ShareHomeScreen'>;
export type PresentationPreviewScreenProps = StackScreenProps<ShareNavigationParamsList, 'PresentationPreviewScreen'>;
export type CredentialScreenShareProps = StackScreenProps<ShareNavigationParamsList, 'CredentialScreen'>;
export type CredentialSelectionScreenProps = StackScreenProps<ShareNavigationParamsList, 'CredentialSelectionScreen'>;
export type PublicLinkScreenShareProps = StackScreenProps<ShareNavigationParamsList, 'PublicLinkScreen'>;
