import React from 'react';
import { View } from 'react-native';
import { Header, Text, Button, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import mixins from '../../styles/mixins';
import theme from '../../styles/theme';
import style from './SettingsScreen.style';
import mockCredential from '../../mock/credential';
import { lock, reset, addCredential } from '../../store/slices/wallet';
import NavHeader from '../../components/NavHeader/NavHeader';
import {
  SettingsItemProps,
  SettingsProps,
  RestoreProps,
  BackupProps,
  AboutProps,
} from './SettingsScreen.d';

const Stack = createStackNavigator();

function SettingsItem({ title, onPress }: SettingsItemProps): JSX.Element {
  return (
    <ListItem
      containerStyle={style.listItemContainer}
      onPress={onPress}
    >
      <ListItem.Content>
        <ListItem.Title style={style.listItemTitle}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
}

function Settings({ navigation }: SettingsProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <>
      <Header
        centerComponent={{ text: 'Settings', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={style.settingsContainer}>
        <SettingsItem title="Restore" onPress={() => navigation.navigate('Restore')} />
        <SettingsItem title="Backup" onPress={() => navigation.navigate('Backup')} />
        <SettingsItem title="About" onPress={() => navigation.navigate('About')} />
        <SettingsItem title="Sign out" onPress={() => dispatch(lock())} />
        <SettingsItem
          title="Add credential (dev)"
          onPress={() => dispatch(addCredential(mockCredential))}
        />
        <SettingsItem
          title="Reset wallet (dev)"
          onPress={async () => dispatch(reset())}
        />
      </View>
    </>
  );
}

function Restore({ navigation: { goBack } }: RestoreProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={goBack} title="Restore" />
      <View style={style.bodyContainer}>
        <Text style={style.paragraph}>Select a walllet file (.extension) from your device to restore from.</Text>
        <Button
          title="Choose a file"
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

function Backup({ navigation: { goBack } }: BackupProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={goBack} title="Backup" />
      <View style={style.bodyContainer}>
        <Text style={style.paragraph}>This will export your wallet contents into a file for you to download.</Text>
        <Button
          title="Backup my wallet"
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

function About({ navigation: { goBack } }: AboutProps): JSX.Element {
  return (
    <>
      <NavHeader goBack={goBack} title="About" />
      <View style={style.bodyContainer}>
        <Text>About</Text>
      </View>
    </>
  );
}

export default function SettingsScreen(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Restore" component={Restore} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
