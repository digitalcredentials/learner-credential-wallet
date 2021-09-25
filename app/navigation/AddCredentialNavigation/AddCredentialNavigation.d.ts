import type { StackScreenProps } from '@react-navigation/stack';

import type { CredentialRecordRaw } from '../../model/credential';

export type AddCredentialNavigationParamList = {
  AddScreen: undefined;
  QRScreen: undefined;
  ApproveCredentialsScreen: {
    rawCredentialRecords: CredentialRecordRaw[];
  }
  ApproveCredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw;
  }
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'QRScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
