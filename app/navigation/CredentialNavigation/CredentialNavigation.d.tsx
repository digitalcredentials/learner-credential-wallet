import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialObject } from '../../model/dao/Credential';

export type CredentialNavigationParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    credentialObject: CredentialObject;
  };
};

export type HomeScreenProps = StackScreenProps<CredentialNavigationParamList, 'HomeScreen'>;
export type CredentialScreenProps = StackScreenProps<CredentialNavigationParamList, 'CredentialScreen'>;

