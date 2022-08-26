import { StackScreenProps } from '@react-navigation/stack';
import { ReactNode } from 'react';
import { WalletImportReport } from '../../types/wallet';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
  readonly rightComponent?: ReactNode;
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
export type RestoreDetailsSettingsProps = StackScreenProps<SettingsNavigationParamList, 'RestoreDetails'>;
export type AboutProps = StackScreenProps<SettingsNavigationParamList, 'About'>;
