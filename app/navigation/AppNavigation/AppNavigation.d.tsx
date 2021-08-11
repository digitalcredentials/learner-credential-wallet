import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type StackParamList = {
  HomeNavigation: undefined;
  LoginScreen: undefined;
  SetupScreen: undefined;
};

export type HomeNavigationProps = {
  route: RouteProp<StackParamList, 'HomeNavigation'>;
  navigation: StackNavigationProp<StackParamList, 'HomeNavigation'>;
}

export type LoginScreenProps = {
  route: RouteProp<StackParamList, 'LoginScreen'>;
  navigation: StackNavigationProp<StackParamList, 'LoginScreen'>;
}

export type SetupScreenProps = {
  route: RouteProp<StackParamList, 'SetupScreen'>;
  navigation: StackNavigationProp<StackParamList, 'SetupScreen'>;
}
