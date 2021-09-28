import { StackScreenProps } from '@react-navigation/stack';
import { WalletImportReport } from '../../types/wallet';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
}

export type SettingsNavigationParamList = {
  Settings: undefined;
  Backup: undefined;
  Restore: undefined;
  RestoreDetails: { importReport: WalletImportReport };
  About: undefined;
};

export type SettingsProps = StackScreenProps<SettingsNavigationParamList, 'Settings'>;
export type BackupProps = StackScreenProps<SettingsNavigationParamList, 'Backup'>;
export type RestoreProps = StackScreenProps<SettingsNavigationParamList, 'Restore'>;
export type RestoreDetailsProps = StackScreenProps<SettingsNavigationParamList, 'RestoreDetails'>;
export type AboutProps = StackScreenProps<SettingsNavigationParamList, 'About'>;
