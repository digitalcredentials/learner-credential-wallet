import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialObject } from '../../model/dao/Credential';

type StackParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    credentialObject: CredentialObject;
  };
};

export type HomeScreenProps = StackScreenProps<StackParamList, 'HomeScreen'>;
export type CredentialScreenProps = StackScreenProps<StackParamList, 'CredentialScreen'>;

