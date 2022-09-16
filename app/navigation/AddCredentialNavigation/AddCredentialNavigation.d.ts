import type { StackScreenProps } from '@react-navigation/stack';
import { ObjectID } from 'bson';
import { CredentialRequestParams } from '../../lib/request';
import { ProfileRecordRaw } from '../../model';
import { IssuerInfoScreenParams, QRScreenParams } from '../../screens';

export type AddCredentialNavigationParamList = {
  AddScreen: undefined;
  CredentialQRScreen: QRScreenParams;
  ChooseProfileScreen: CredentialRequestParams | undefined;
  ApproveCredentialsScreen: {
    rawProfileRecord: ProfileRecordRaw
    credentialRequestParams?: CredentialRequestParams;
  }
  ApproveCredentialScreen: {
    pendingCredentialId: string;
    profileRecordId: ObjectID;
  }
  IssuerInfoScreen: IssuerInfoScreenParams;
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenCredentialProps = StackScreenProps<AddCredentialNavigationParamList, 'CredentialQRScreen'>;
export type ChooseProfileScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ChooseProfileScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
export type IssuerInfoScreenAddProps = StackScreenProps<AddCredentialNavigationParamList, 'IssuerInfoScreen'>;
