import type { StackScreenProps } from '@react-navigation/stack';
import { CredentialRequest } from '../../lib/request';

export type AddCredentialNavigationParamList = {
  AddScreen: CredentialRequest | undefined;
  QRScreen: undefined;
  ApproveCredentialsScreen: undefined;
  ApproveCredentialScreen: {
    pendingCredentialId: string;
  }
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'QRScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
