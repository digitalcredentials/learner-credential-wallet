import type { StackScreenProps } from '@react-navigation/stack';
import type { Credential } from '../../types/credential';

export type CredentialNavigationParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    credential: Credential;
  };
};

export type HomeScreenProps = StackScreenProps<CredentialNavigationParamList, 'HomeScreen'>;
export type CredentialScreenHomeProps = StackScreenProps<CredentialNavigationParamList, 'CredentialScreen'>;

