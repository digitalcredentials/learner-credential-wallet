import React, { useState } from 'react';
import { ScrollView, Image, Linking, AccessibilityInfo, Switch } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';

import appConfig from '../../../app.json';
import walletImage from '../../assets/wallet.png';
import styles from './SettingsNavigation.styles';
import { NavHeader, ConfirmModal, BackupItemModal } from '../../components';
import { lock, reset, selectWalletState, toggleBiometrics } from '../../store/slices/wallet';
import {
  SettingsItemProps,
  SettingsProps,
  AboutProps,
  SettingsNavigationParamList,
} from './SettingsNavigation.d';
import { AddExistingProfileScreen, DetailsScreen, DeveloperScreen, ManageProfilesScreen, QRScreen, RestoreWalletScreen, ViewSourceScreen } from '../../screens';
import { useAppDispatch, useResetNavigationOnBlur } from '../../hooks';
import { SettingsNavigationProps } from '../';
import { exportWallet } from '../../lib/export';
import { theme } from '../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator<SettingsNavigationParamList>();

function SettingsItem({ title, onPress, rightComponent, disabled }: SettingsItemProps): JSX.Element {
  const _rightComponent = rightComponent || (
    <ListItem.Chevron
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
    />
  );

  return (
    <ListItem
      hasTVPreferredFocus={undefined}
      tvParallaxProperties={undefined}
      containerStyle={styles.listItemContainer}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={styles.listItemContainerDisabled}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      {_rightComponent}
    </ListItem>
  );
}

function Settings({ navigation }: SettingsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const { isBiometricsSupported } = useSelector(selectWalletState);
  const { isBiometricsEnabled: initialBiometryValue } = useSelector(selectWalletState);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(initialBiometryValue);

  async function resetWallet() {
    dispatch(reset());
  }

  function lockWallet() {
    AccessibilityInfo.announceForAccessibility('Locked Wallet');
    dispatch(lock());
  }

  async function onToggleBiometrics() {
    const initialState = isBiometricsEnabled;
    setIsBiometricsEnabled(!initialState);

    try {
      await dispatch(toggleBiometrics());
    } catch (err) {
      setIsBiometricsEnabled(initialState);
      console.error('Could not toggle biometrics', err);
    }
  }

  const biometricSwitch = (
    <Switch
      style={styles.switch}
      thumbColor={isBiometricsEnabled ? theme.color.backgroundSecondary : theme.color.backgroundPrimary}
      trackColor={{ true: theme.color.switchActive, false: theme.color.iconInactive }} 
      ios_backgroundColor={theme.color.iconInactive}
      value={isBiometricsEnabled}
      onValueChange={onToggleBiometrics}
      disabled={!isBiometricsSupported}
    />
  );

  return (
    <>
      <NavHeader title="Settings" />
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        <SettingsItem title="Use biometrics to unlock" onPress={onToggleBiometrics} rightComponent={biometricSwitch} disabled={!isBiometricsSupported} />
        <SettingsItem title="Manage profiles" onPress={() => navigation.navigate('ManageProfilesScreen')} />
        <SettingsItem title="Restore wallet" onPress={() => navigation.navigate('RestoreWalletScreen')} />
        <SettingsItem title="Backup wallet" onPress={() => setBackupModalOpen(true)} />
        <SettingsItem title="Reset wallet" onPress={() => setResetModalOpen(true)} />
        <SettingsItem title="About" onPress={() => navigation.navigate('About')} />
        <SettingsItem title="Sign out" onPress={lockWallet} />
      </ScrollView>
      <ConfirmModal
        open={resetModalOpen}
        onRequestClose={() => setResetModalOpen(false)}
        onConfirm={resetWallet}
        confirmText="Yes"
        title="Are you sure you would like to reset your wallet?"
      />
      <BackupItemModal 
        open={backupModalOpen}
        onRequestClose={() => setBackupModalOpen(false)} 
        onBackup={exportWallet}
        backupItemName="Wallet"
        backupModalText="This will backup your wallet contents into a file for you to download."
      />
    </>
  );
}

function About({ navigation }: AboutProps): JSX.Element {
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  function goToDeveloperScreen() {
    navigation.navigate('DeveloperScreen');
  }

  return (
    <>
      <NavHeader goBack={() => navigation.navigate('Settings')} title="About" />
      <ScrollView contentContainerStyle={styles.bodyContainerCenter}>
        <Image
          style={styles.image}
          source={walletImage}
          accessible
          accessibilityLabel={`${appConfig.displayName} Logo`}
        />
        <Text style={styles.paragraphCenter}>{appConfig.displayName}</Text>
        <Text style={styles.paragraphCenter}>
          This mobile wallet was developed by the Digital Credentials Consortium, a network of leading international universities designing an open infrastructure for academic credentials.
        </Text>
        <Text style={styles.paragraphCenter} accessibilityRole="link" >
          More information at&nbsp;
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://lcw.app')}
          >
            https://lcw.app
          </Text>.
        </Text>
        <Text style={styles.paragraphCenter}>
          Copyright 2021-2022 Massachusetts Institute of Technology
        </Text>
        <TouchableOpacity onPress={goToDeveloperScreen}>
          <Text style={styles.paragraphCenter}>
            v{version} - Build {buildNumber}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

export default function SettingsNavigation({ navigation }: SettingsNavigationProps): JSX.Element {
  useResetNavigationOnBlur(navigation);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ManageProfilesScreen" component={ManageProfilesScreen} />
      <Stack.Screen name="AddExistingProfileScreen" component={AddExistingProfileScreen} />
      <Stack.Screen name="ProfileQRScreen" component={QRScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      <Stack.Screen name="ViewSourceScreen" component={ViewSourceScreen} />
      <Stack.Screen name="RestoreWalletScreen" component={RestoreWalletScreen} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="DeveloperScreen" component={DeveloperScreen} />
    </Stack.Navigator>
  );
}
