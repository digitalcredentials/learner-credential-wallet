import { RouteProp } from '@react-navigation/native';
import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';

export type TabParamList = {
  HomeScreen: undefined;
  ShareScreen: undefined;
  AddScreen: undefined;
  SettingsScreen: undefined;
};

export type HomeScreenProps = {
  route: RouteProp<TabParamList, 'HomeScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'HomeScreen'>;
}

export type ShareScreenProps = {
  route: RouteProp<TabParamList, 'ShareScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'ShareScreen'>;
}

export type AddScreenProps = {
  route: RouteProp<TabParamList, 'AddScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'AddScreen'>;
}

export type SettingsScreenProps = {
  route: RouteProp<TabParamList, 'SettingsScreen'>;
  navigation: MaterialBottomTabNavigationProp<TabParamList, 'SettingsScreen'>;
}

export type TabIconProps = {
  color: string;
}
