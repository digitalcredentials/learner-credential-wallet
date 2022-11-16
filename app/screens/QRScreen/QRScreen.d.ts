export type { QRScreenProps } from '../../navigation';

export type QRScreenParams = {
  onReadQRCode: (text: string, qrScreenMethods: QRScreenMethods) => (Promise<void> | void);
  instructionText: string;
}

export type QRScreenMethods = {
  confirmResult: (ConfirmResultConfig) => Promise<boolean>;
}

export type ConfirmResultCallback = (response: boolean) => void;

export type ConfirmResultConfig = {
  title: string;
  message: string;
}
