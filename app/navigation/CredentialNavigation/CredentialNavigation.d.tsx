import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';

export type CredentialNavigationParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw;
    noShishKabob?: boolean;
  };
  ShareCredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw
  };
};

export type HomeScreenProps = StackScreenProps<CredentialNavigationParamList, 'HomeScreen'>;
export type CredentialScreenProps = StackScreenProps<CredentialNavigationParamList, 'CredentialScreen'>;
export type ShareCredentialScreenProps = StackScreenProps<CredentialNavigationParamList, 'ShareCredentialScreen'>;
