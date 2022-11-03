import type { StackScreenProps } from '@react-navigation/stack';
import { QRScreenParams } from '../../screens';

export type AddNavigationParamList = {
  AddScreen: undefined;
  CredentialQRScreen: QRScreenParams;
};

export type AddScreenProps = StackScreenProps<AddNavigationParamList, 'AddScreen'>;
export type QRScreenCredentialProps = StackScreenProps<AddNavigationParamList, 'CredentialQRScreen'>;
