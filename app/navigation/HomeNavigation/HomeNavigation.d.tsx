import { RouteProp, NavigatorScreenParams } from '@react-navigation/native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

import type { StackParamList as AddCredentialNavigationParamList } from '../AddCredentialNavigation/AddCredentialNavigation.d';
import type { StackParamList as SettingsNavigationParamList } from '../SettingsNavigation/SettingsNavigation.d';

export type TabParamList = {
  CredentialNavigation: undefined;
  ShareScreen: undefined;
  AddCredentialNavigation: NavigatorScreenParams<AddCredentialNavigationParamList>;
  SettingsNavigation: NavigatorScreenParams<SettingsNavigationParamList>;
};

export type HomeScreenProps = {
  route: RouteProp<TabParamList, 'CredentialNavigation'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'CredentialNavigation'>;
}

export type ShareScreenProps = {
  route: RouteProp<TabParamList, 'ShareScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'ShareScreen'>;
}

export type AddCredentialNavigationProps = {
  route: RouteProp<TabParamList, 'AddCredentialNavigation'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'AddCredentialNavigation'>;
}

export type SettingsNavigationProps = {
  route: RouteProp<TabParamList, 'SettingsNavigation'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'SettingsNavigation'>;
}

export type TabIconProps = {
  color: string;
}
