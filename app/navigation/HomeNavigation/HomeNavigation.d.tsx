import { RouteProp, NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
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

export type CredentialNavigationProps = {
  route: RouteProp<HomeNavigationParamList, 'CredentialNavigation'>;
  navigation: BottomTabNavigationProp<HomeNavigationParamList, 'CredentialNavigation'>;
}

export type ShareNavigationProps = {
  route: RouteProp<HomeNavigationParamList, 'ShareNavigation'>;
  navigation: BottomTabNavigationProp<HomeNavigationParamList, 'ShareNavigation'>;
}

export type AddCredentialNavigationProps = {
  route: RouteProp<HomeNavigationParamList, 'AddCredentialNavigation'>;
  navigation: BottomTabNavigationProp<HomeNavigationParamList, 'AddCredentialNavigation'>;
}

export type SettingsNavigationProps = {
  route: RouteProp<HomeNavigationParamList, 'SettingsNavigation'>;
  navigation: BottomTabNavigationProp<HomeNavigationParamList, 'SettingsNavigation'>;
}

export type TabIconProps = {
  color: string;
}
