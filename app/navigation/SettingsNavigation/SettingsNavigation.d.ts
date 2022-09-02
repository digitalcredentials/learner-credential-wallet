import { StackScreenProps } from '@react-navigation/stack';
import { ReactNode } from 'react';
import { DetailsScreenParams, QRScreenParams } from '../../screens';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
  readonly rightComponent?: ReactNode;
}

export type SettingsNavigationParamList = {
  Settings: undefined;
  RestoreWalletScreen: undefined;
  About: undefined;
  ManageProfilesScreen: undefined;
  AddExistingProfileScreen: undefined;
  ProfileQRScreen: QRScreenParams;
  DetailsScreen: DetailsScreenParams;
  ViewSourceScreen: {
    data: unknown;
  }
  DeveloperScreen: undefined;
};

export type SettingsProps = StackScreenProps<SettingsNavigationParamList, 'Settings'>;
export type RestoreWalletScreenProps = StackScreenProps<SettingsNavigationParamList, 'RestoreWalletScreen'>;
export type AboutProps = StackScreenProps<SettingsNavigationParamList, 'About'>;
export type ManageProfilesScreenProps = StackScreenProps<SettingsNavigationParamList, 'ManageProfilesScreen'>;
export type AddExistingProfileScreenProps = StackScreenProps<SettingsNavigationParamList, 'AddExistingProfileScreen'>;
export type DetailsScreenSettingsProps = StackScreenProps<SettingsNavigationParamList, 'DetailsScreen'>;
export type ViewSourceScreenProps = StackScreenProps<SettingsNavigationParamList, 'ViewSourceScreen'>;
export type QRScreenProfileProps = StackScreenProps<SettingsNavigationParamList, 'ProfileQRScreen'>;
export type DeveloperScreenProps = StackScreenProps<SettingsNavigationParamList, 'DeveloperScreen'>;
