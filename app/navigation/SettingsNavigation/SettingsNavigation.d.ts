import { StackNavigationProp } from '@react-navigation/stack';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
}

export type SettingsNavigationParamList = {
  Settings: undefined;
  Backup: undefined;
  Restore: undefined;
  About: undefined;
};

export type SettingsProps = {
  navigation: StackNavigationProp<SettingsNavigationParamList, 'Settings'>;
}

export type RestoreProps = {
  navigation: StackNavigationProp<SettingsNavigationParamList, 'Restore'>;
}

export type BackupProps = {
  navigation: StackNavigationProp<SettingsNavigationParamList, 'Backup'>;
}

export type AboutProps = {
  navigation: StackNavigationProp<SettingsNavigationParamList, 'About'>;
}
