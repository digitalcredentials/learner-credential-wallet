import type { StackScreenProps } from '@react-navigation/stack';

export type AddCredentialNavigationParamList = {
  AddScreen: undefined;
  QRScreen: undefined;
};

export type AddScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<AddCredentialNavigationParamList, 'QRScreen'>;
