import { StackScreenProps } from '@react-navigation/stack';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
}

export type SettingsNavigationParamList = {
  Settings: undefined;
  Backup: undefined;
  Restore: undefined;
  About: undefined;
  ManageProfilesScreen: undefined;
  ProfileQRScreen: QRScreenParams;
  DetailsScreen: {
    header: string;
    details: Record<string, string[]>
  };
  ViewSourceScreen: {
    data: unknown;
  }
};

export type SettingsProps = StackScreenProps<SettingsNavigationParamList, 'Settings'>;
export type BackupProps = StackScreenProps<SettingsNavigationParamList, 'Backup'>;
export type RestoreProps = StackScreenProps<SettingsNavigationParamList, 'Restore'>;
export type AboutProps = StackScreenProps<SettingsNavigationParamList, 'About'>;
export type ManageProfilesScreenProps = StackScreenProps<SettingsNavigationParamList, 'ManageProfilesScreen'>;
export type DetailsScreenProps = StackScreenProps<SettingsNavigationParamList, 'DetailsScreen'>;
export type ViewSourceScreenProps = StackScreenProps<SettingsNavigationParamList, 'ViewSourceScreen'>;
export type ProfileQRScreenProps = StackScreenProps<SettingsNavigationParamList, 'ProfileQRScreen'>;
