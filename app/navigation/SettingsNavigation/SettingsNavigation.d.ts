import { StackNavigationProp } from '@react-navigation/stack';

export type SettingsItemProps = {
  readonly title: string;
  readonly onPress: () => void;
}

export type StackParamList = {
  Settings: undefined;
  Backup: undefined;
  Restore: undefined;
  About: undefined;
};

export type SettingsProps = {
  navigation: StackNavigationProp<StackParamList, 'Settings'>;
}

export type RestoreProps = {
  navigation: StackNavigationProp<StackParamList, 'Restore'>;
}

export type BackupProps = {
  navigation: StackNavigationProp<StackParamList, 'Backup'>;
}

export type AboutProps = {
  navigation: StackNavigationProp<StackParamList, 'About'>;
}
