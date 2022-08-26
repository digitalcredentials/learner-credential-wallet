import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CredentialRecordRaw } from '../../model/credential';

import type {
  AddCredentialNavigationParamList,
  CredentialNavigationParamList,
  SettingsNavigationParamList,
} from '../';


export type HomeNavigationParamList = {
  CredentialNavigation: NavigatorScreenParams<CredentialNavigationParamList>;
  ShareNavigation: undefined;
  AddCredentialNavigation: NavigatorScreenParams<AddCredentialNavigationParamList>;
  SettingsNavigation: NavigatorScreenParams<SettingsNavigationParamList>;
  DebugScreen: {
    rawCredentialRecord: CredentialRecordRaw;
  };
};

export type CredentialNavigationProps = BottomTabScreenProps<HomeNavigationParamList, 'CredentialNavigation'>;
export type ShareNavigationProps = BottomTabScreenProps<HomeNavigationParamList, 'ShareNavigation'>;
export type AddCredentialNavigationProps = BottomTabScreenProps<HomeNavigationParamList, 'AddCredentialNavigation'>;
export type SettingsNavigationProps = BottomTabScreenProps<HomeNavigationParamList, 'SettingsNavigation'>;

export type TabIconProps = {
  color: string;
}
