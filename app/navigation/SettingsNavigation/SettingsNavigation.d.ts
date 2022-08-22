import { StackScreenProps } from '@react-navigation/stack';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
}

export type SettingsNavigationParamList = {
  Settings: undefined;
  Backup: undefined;
  RestoreWalletScreen: undefined;
  About: undefined;
  ManageProfilesScreen: undefined;
  AddExistingProfileScreen: undefined;
  ProfileQRScreen: QRScreenParams;
  DetailsScreen: {
    header: string;
    details: Record<string, string[]>;
    goBack?: () => void;
  };
  ViewSourceScreen: {
    data: unknown;
  }
};

export type SettingsProps = StackScreenProps<SettingsNavigationParamList, 'Settings'>;
export type BackupProps = StackScreenProps<SettingsNavigationParamList, 'Backup'>;
export type RestoreWalletScreenProps = StackScreenProps<SettingsNavigationParamList, 'RestoreWalletScreen'>;
export type AboutProps = StackScreenProps<SettingsNavigationParamList, 'About'>;
export type ManageProfilesScreenProps = StackScreenProps<SettingsNavigationParamList, 'ManageProfilesScreen'>;
export type AddExistingProfileScreenProps = StackScreenProps<SettingsNavigationParamList, 'AddExistingProfileScreen'>;
export type DetailsScreenProps = StackScreenProps<SettingsNavigationParamList, 'DetailsScreen'>;
export type ViewSourceScreenProps = StackScreenProps<SettingsNavigationParamList, 'ViewSourceScreen'>;
export type ProfileQRScreenProps = StackScreenProps<SettingsNavigationParamList, 'ProfileQRScreen'>;
