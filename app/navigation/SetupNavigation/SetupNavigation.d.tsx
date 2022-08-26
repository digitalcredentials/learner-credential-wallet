import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack';
import { DetailsScreenParams } from '../../screens';

export type SetupNavigationParamList = {
  StartStep: undefined;
  CreateStep: {
    password: string;
    enableBiometrics: boolean;
  };
  PasswordStep: {
    isCustomSetup: boolean,
  } | undefined;
  CustomMethodStep: {
    password: string
    enableBiometrics: boolean;
  };
  DetailsScreen: DetailsScreenParams;
};

export type StartStepProps = StackScreenProps<SetupNavigationParamList, 'StartStep'>;
export type CreateStepProps = StackScreenProps<SetupNavigationParamList, 'CreateStep'>;
export type PasswordStepProps = StackScreenProps<SetupNavigationParamList, 'PasswordStep'>;
export type CustomMethodStepProps = StackScreenProps<SetupNavigationParamList, 'CustomMethodStep'>;
export type DetailsScreenSetupProps = StackScreenProps<SetupNavigationParamList, 'DetailsScreen'>;

export type ForFadeType = StackNavigationOptions['cardStyleInterpolator']
