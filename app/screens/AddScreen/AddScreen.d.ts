import type { StackScreenProps } from '@react-navigation/stack';

export type StackParamList = {
  AddCredentialHome: undefined;
  QRScreen: undefined;
  ImportScreen: undefined;
};

export type AddCredentialHomeProps = StackScreenProps<StackParamList, 'AddCredentialHome'>;
export type QRScreenProps = StackScreenProps<StackParamList, 'QRScreen'>;
export type ImportScreenProps = StackScreenProps<StackParamList, 'ImportScreen'>;
