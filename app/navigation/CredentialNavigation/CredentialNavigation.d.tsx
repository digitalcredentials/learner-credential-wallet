import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';
import { PublicLinkScreenParams } from '../../screens';

export type CredentialNavigationParamList = {
  HomeScreen: undefined;
  CredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw;
    noShishKabob?: boolean;
  };
  ShareCredentialScreen: {
    rawCredentialRecord: CredentialRecordRaw
  };
  PublicLinkScreen: PublicLinkScreenParams,
};

export type HomeScreenProps = StackScreenProps<CredentialNavigationParamList, 'HomeScreen'>;
export type CredentialScreenHomeProps = StackScreenProps<CredentialNavigationParamList, 'CredentialScreen'>;
export type ShareCredentialScreenProps = StackScreenProps<CredentialNavigationParamList, 'ShareCredentialScreen'>;
export type PublicLinkScreenCredentialProps = StackScreenProps<CredentialNavigationParamList, 'PublicLinkScreen'>;
