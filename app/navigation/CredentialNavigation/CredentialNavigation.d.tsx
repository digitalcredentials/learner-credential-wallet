import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';

export type CredentialNavigationParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw;
    noShishKabob?: boolean;
  };
};

export type HomeScreenProps = StackScreenProps<CredentialNavigationParamList, 'HomeScreen'>;
export type CredentialScreenHomeProps = StackScreenProps<CredentialNavigationParamList, 'CredentialScreen'>;

