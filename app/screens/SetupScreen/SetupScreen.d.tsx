import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackNavigationOptions } from '@react-navigation/stack';

type StackParamList = {
  StartStep: undefined;
  CreateStep: undefined;
  PasswordStep: undefined;
};

export type StartStepProps = {
  route: RouteProp<StackParamList, 'StartStep'>;
  navigation: StackNavigationProp<StackParamList, 'StartStep'>;
}

export type CreateStepProps = {
  route: RouteProp<StackParamList, 'CreateStep'>;
  navigation: StackNavigationProp<StackParamList, 'CreateStep'>;
}

export type PasswordStepProps = {
  route: RouteProp<StackParamList, 'PasswordStep'>;
  navigation: StackNavigationProp<StackParamList, 'PasswordStep'>;
}

export type ForFadeType = StackNavigationOptions['cardStyleInterpolator']
