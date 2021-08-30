import type { StackScreenProps } from '@react-navigation/stack';
import type { Credential } from '../../types/credential';

export type StackParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    credential: Credential;
  };
};

export type HomeScreenProps = StackScreenProps<StackParamList, 'HomeScreen'>;
export type CredentialScreenProps = StackScreenProps<StackParamList, 'CredentialScreen'>;

