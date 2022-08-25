import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp, StackNavigationOptions } from '@react-navigation/stack';
import { WalletImportReport } from '../../types/wallet';

export type SetupNavigationParamList = {
  StartStep: undefined;
  CreateStep: {
    password: string;
  };
  PasswordStep: {
    nextStep: keyof SetupNavigationParamList;
  };
  CustomMethodStep: {
    password: string
  };
  RestoreDetails: { importReport: WalletImportReport };
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

export type CustomMethodStepProps = {
  route: RouteProp<SetupNavigationParamList, 'CustomMethodStep'>;
  navigation: StackNavigationProp<SetupNavigationParamList, 'CustomMethodStep'>;
}

export type RestoreDetailsSetupProps = {
  route: RouteProp<SetupNavigationParamList, 'RestoreDetails'>;
  navigation: StackNavigationProp<SetupNavigationParamList, 'RestoreDetails'>;
}

export type ForFadeType = StackNavigationOptions['cardStyleInterpolator']
