import type { StackScreenProps } from '@react-navigation/stack';

import type { PendingCredential } from '../../store/slices/credentialFoyer';

export type AddCredentialNavigationParamList = {
  AddScreen: undefined;
  QRScreen: undefined;
  ApproveCredentialsScreen: undefined;
  ApproveCredentialScreen: {
    pendingCredential: PendingCredential;
  }
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'QRScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
