import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';
import type { VerifyPayload } from '../../hooks';
import type { HomeNavigationParamList, AcceptCredentialsNavigationParamList } from '../';
import { Credential } from '../../types/credential';
import { ProfileRecordRaw } from '../../model';

export type RootNavigationParamsList = {
  HomeNavigation: NavigatorScreenParams<HomeNavigationParamList>;
  DebugScreen: {
    rawCredentialRecord: CredentialRecordRaw;
    rawProfileRecord: ProfileRecordRaw;
  };
  VerificationStatusScreen: {
    credential: Credential;
    verifyPayload: VerifyPayload;
  };
  AcceptCredentialsNavigation: NavigatorScreenParams<AcceptCredentialsNavigationParamList>;
};

export type HomeNavigationProps = StackScreenProps<RootNavigationParamsList, 'HomeNavigation'>
export type DebugScreenProps = StackScreenProps<RootNavigationParamsList, 'DebugScreen'>
export type VerificationStatusScreenProps = StackScreenProps<RootNavigationParamsList, 'VerificationStatusScreen'>
export type AcceptCredentialsNavigationProps = StackScreenProps<RootNavigationParamsList, 'AcceptCredentialsNavigation'>
