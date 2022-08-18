import type { StackScreenProps } from '@react-navigation/stack';
import { CredentialRequestParams } from '../../lib/request';
import { Profile } from '../../types/profile';

export type AddCredentialNavigationParamList = {
  AddScreen: CredentialRequestParams | undefined;
  QRScreen: undefined;
  ChooseProfileScreen: {
    onSelectProfile: (profile: Profile) => void;
  } | undefined;
  ApproveCredentialsScreen: {
    profile: Profile
  };
  ApproveCredentialScreen: {
    pendingCredentialId: string;
  }
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'QRScreen'>;
export type ChooseProfileScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ChooseProfileScreen'>;
export type ApproveCredentialsScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialsScreen'>;
export type ApproveCredentialScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'ApproveCredentialScreen'>;
