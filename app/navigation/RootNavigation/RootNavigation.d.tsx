import type { StackScreenProps } from '@react-navigation/stack';
import type { CredentialRecordRaw } from '../../model/credential';

export type RootNavigationParamsList = {
  HomeNavigation: undefined;
  DebugScreen: {
    rawCredentialRecord: CredentialRecordRaw;
  };
};

export type HomeNavigationProps = StackScreenProps<RootNavigationParamsList, 'HomeNavigation'>
export type DebugScreenProps = StackScreenProps<RootNavigationParamsList, 'DebugScreen'>
