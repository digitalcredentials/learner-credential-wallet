import type { StackScreenProps } from '@react-navigation/stack';
import { ObjectID } from 'bson';
import { CredentialRequestParams } from '../../lib/credentialRequest';
import { ProfileRecordRaw } from '../../model';
import { IssuerInfoScreenParams } from '../../screens';

export type AcceptCredentialsNavigationParamList = {
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

export type ChooseProfileScreenProps = StackScreenProps<AcceptCredentialsNavigationParamList, 'ChooseProfileScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AcceptCredentialsNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AcceptCredentialsNavigationParamList, 'ApproveCredentialScreen'>;
export type IssuerInfoScreenAddProps = StackScreenProps<AcceptCredentialsNavigationParamList, 'IssuerInfoScreen'>;
