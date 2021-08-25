import type { StackScreenProps } from '@react-navigation/stack';

export type StackParamList = {
  AddScreen: undefined;
  QRScreen: undefined;
};

export type AddScreenProps = StackScreenProps<StackParamList, 'AddScreen'>;
export type QRScreenProps = StackScreenProps<StackParamList, 'QRScreen'>;
