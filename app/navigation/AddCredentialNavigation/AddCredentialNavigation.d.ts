import type { StackScreenProps } from '@react-navigation/stack';
import { ObjectID } from 'bson';
import { CredentialRequestParams } from '../../lib/request';
import { ProfileRecordRaw } from '../../model';
import { QRScreenParams } from '../../screens/QRScreen/QRScreen';

export type AddCredentialNavigationParamList = {
  AddScreen: CredentialRequestParams | undefined;
  CredentialQRScreen: QRScreenParams;
  ChooseProfileScreen: {
    onSelectProfile: (profile: Profile) => void;
  } | undefined;
  ApproveCredentialsScreen: {
    rawProfileRecord: ProfileRecordRaw
  };
  ApproveCredentialScreen: {
    pendingCredentialId: string;
    profileRecordId: ObjectID;
  }
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type CredentialQRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'CredentialQRScreen'>;
export type ChooseProfileScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ChooseProfileScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
