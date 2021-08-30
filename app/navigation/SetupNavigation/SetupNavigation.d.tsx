import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackNavigationOptions } from '@react-navigation/stack';

export type SetupNavigationParamList = {
  StartStep: undefined;
  CreateStep: {
    password: string;
  };
  PasswordStep: undefined;
};

export type StartStepProps = {
  route: RouteProp<SetupNavigationParamList, 'StartStep'>;
  navigation: StackNavigationProp<SetupNavigationParamList, 'StartStep'>;
}

export type CreateStepProps = {
  route: RouteProp<SetupNavigationParamList, 'CreateStep'>;
  navigation: StackNavigationProp<SetupNavigationParamList, 'CreateStep'>;
}

export type PasswordStepProps = {
  route: RouteProp<SetupNavigationParamList, 'PasswordStep'>;
  navigation: StackNavigationProp<SetupNavigationParamList, 'PasswordStep'>;
}

export type ForFadeType = StackNavigationOptions['cardStyleInterpolator']
