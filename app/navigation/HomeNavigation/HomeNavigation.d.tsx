import { RouteProp, NavigatorScreenParams } from '@react-navigation/native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

import type { StackParamList as AddCredentialNavigationParamList } from '../AddCredentialNavigation/AddCredentialNavigation.d';
import type { StackParamList as SettingsScreenParamList } from '../../screens/SettingsScreen/SettingsScreen.d';

export type TabParamList = {
  HomeScreen: undefined;
  ShareScreen: undefined;
  AddCredentialNavigation: NavigatorScreenParams<AddCredentialNavigationParamList>;
  SettingsScreen: NavigatorScreenParams<SettingsScreenParamList>;
};

export type HomeScreenProps = {
  route: RouteProp<TabParamList, 'HomeScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'HomeScreen'>;
}

export type ShareScreenProps = {
  route: RouteProp<TabParamList, 'ShareScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'ShareScreen'>;
}

export type AddCredentialNavigationProps = {
  route: RouteProp<TabParamList, 'AddCredentialNavigation'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'AddCredentialNavigation'>;
}

export type SettingsScreenProps = {
  route: RouteProp<TabParamList, 'SettingsScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'SettingsScreen'>;
}

export type TabIconProps = {
  color: string;
}
