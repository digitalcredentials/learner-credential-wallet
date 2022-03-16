import React, { useState } from 'react';
import { View, Image, Linking, ScrollView, AccessibilityInfo } from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import DeviceInfo from 'react-native-device-info';

import appConfig from '../../../app.json';
import walletImage from '../../assets/wallet.png';
import { theme, mixins } from '../../styles';
import styles from './SettingsNavigation.styles';
import { NavHeader, ConfirmModal } from '../../components';
import { lock, reset, getAllCredentials } from '../../store/slices/wallet';
import { getAllDidRecords } from '../../store/slices/did';
import {
  SettingsItemProps,
  SettingsProps,
  RestoreProps,
  RestoreDetailsProps,
  BackupProps,
  AboutProps,
} from '../';
import { exportWallet } from '../../lib/export';
import { importWallet } from '../../lib/import';

const Stack = createStackNavigator();

function SettingsItem({ title, onPress }: SettingsItemProps): JSX.Element {
  return (
    <ListItem
      containerStyle={styles.listItemContainer}
      onPress={onPress}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.listItemTitle}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

function Settings({ navigation }: SettingsProps): JSX.Element {
  const dispatch = useDispatch();
  const [resetModalOpen, setResetModalOpen] = useState(false);

  async function resetWallet() {
    dispatch(reset());
  }

  function lockWallet() {
    AccessibilityInfo.announceForAccessibility('Locked Wallet');
    dispatch(lock());
  }

  return (
    <>
      <NavHeader title="Settings" />
      <View style={styles.settingsContainer}>
        <SettingsItem title="Restore" onPress={() => navigation.navigate('Restore')} />
        <SettingsItem title="Backup" onPress={() => navigation.navigate('Backup')} />
        <SettingsItem title="Reset wallet" onPress={() => setResetModalOpen(true)} />
        <SettingsItem title="About" onPress={() => navigation.navigate('About')} />
        <SettingsItem title="Sign out" onPress={lockWallet} />
      </View>
      <ConfirmModal
        open={resetModalOpen}
        onRequestClose={() => setResetModalOpen(!resetModalOpen)}
        onConfirm={resetWallet}
        confirmText="Yes"
        title="Are you sure you would like to reset your wallet?"
      />
    </>
  );
}

function Restore({ navigation }: RestoreProps): JSX.Element {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [importReport, setImportReport] = useState({});

  async function _importWallet() {
    await importWallet({
      onStart: () => setModalIsOpen(true),
      onFinish: (report) => {
        setImportReport(report);
        setDone(true);
      },
    });

    dispatch(getAllCredentials());
    dispatch(getAllDidRecords());
  }

  async function _goToDetails() {
    setModalIsOpen(false);
    navigation.navigate('RestoreDetails', { importReport });
  }

  const reportSummary = Object.keys(importReport).join('\n');

  return (
    <>
      <NavHeader goBack={navigation.goBack} title="Restore" />
      <ConfirmModal
        open={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        cancelButton={false}
        confirmButton={done}
        title={done ? 'Restore Complete' : 'Restoring From File'}
        confirmText="Close"
      >
        {done ? (
          <>
            <Text style={styles.reportSummary}>{reportSummary}</Text>
            <Button
              buttonStyle={styles.buttonClear}
              titleStyle={styles.buttonClearTitle}
              containerStyle={styles.buttonClearContainer}
              title="Details"
              onPress={_goToDetails}
            />
          </>
        ) : (
          <>
            <Text style={styles.reportSummary}>This will only take a moment.</Text>
            <View style={styles.loadingContainer}>
              <AnimatedEllipsis style={styles.loadingDots} minOpacity={0.4} animationDelay={200}/>
            </View>
          </>
        )}
      </ConfirmModal>
      <View style={styles.bodyContainer}>

        <Text style={styles.paragraph}>Select a wallet file (.json) from your device to restore from.</Text>
        <Button
          onPress={_importWallet}
          title="Choose a file"
          containerStyle={styles.buttonContainer}
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          icon={
            <MaterialIcons
              name="upload-file"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}

function RestoreDetails({ navigation, route }: RestoreDetailsProps): JSX.Element {
  const { importReport } = route.params;

  return (
    <>
      <NavHeader goBack={navigation.goBack} title="Restore Details" />
      <ScrollView style={styles.bodyContainer}>
        {Object.entries(importReport).map(([sectionTitle, items]) => (
          <View style={styles.sectionContainer} key={sectionTitle}>
            <Text style={styles.header}>{sectionTitle}</Text>
            {items.map((item, i) => (
              <Text key={`${i}-${item}`} style={styles.bulletItem}>
                ●  {item}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );
}

function Backup({ navigation }: BackupProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={() => navigation.navigate('Settings')} title="Backup" />
      <View style={styles.bodyContainer}>
        <Text style={styles.paragraph}>This will export your wallet contents into a file for you to download.</Text>
        <Button
          onPress={exportWallet}
          title="Backup my wallet"
          containerStyle={styles.buttonContainer}
          buttonStyle={mixins.buttonIcon}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          icon={
            <MaterialIcons
              name="file-download"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
    </>
  );
}

function About({ navigation }: AboutProps): JSX.Element {
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();
  return (
    <>
      <NavHeader goBack={() => navigation.navigate('Settings')} title="About" />
      <View style={styles.bodyContainerCenter}>
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
        <Text style={styles.paragraphCenter}>
          v{version} - Build {buildNumber}
        </Text>
      </View>
    </>
  );
}

export default function SettingsNavigation(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Restore" component={Restore} />
      <Stack.Screen name="RestoreDetails" component={RestoreDetails} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
