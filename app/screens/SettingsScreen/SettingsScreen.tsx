import React from 'react';
import { View, Text } from 'react-native';
import { Header, ListItem, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

import mixins from '../../styles/mixins';
import style from './SettingsScreen.style';
import mockCredential from '../../mock/credential';
import { lock, reset, addCredential } from '../../store/slices/wallet';
import {
  SettingsItemProps,
  BackButtonProps,
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
      <View style={style.bodyContainer}>
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

function BackButton({ onPress }: BackButtonProps): JSX.Element {
  return (
    <Button
      onPress={onPress}
      buttonStyle={style.buttonStyle}
      icon={(
        <MaterialIcons
          name="arrow-back-ios"
          size={20}
          style={style.iconStyle}
        />
      )}
      title=""
    />
  );
}

function Restore({ navigation: { goBack } }: RestoreProps): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Restore', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
        leftComponent={<BackButton onPress={goBack} />}
      />
      <View style={style.bodyContainer}>
        <Text>Restore</Text>
      </View>
    </>
  );
}

function Backup({ navigation: { goBack } }: BackupProps): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'Backup', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
        leftComponent={<BackButton onPress={goBack} />}
      />
      <View style={style.bodyContainer}>
        <Text>Backup</Text>
      </View>
    </>
  );
}

function About({ navigation: { goBack } }: AboutProps): JSX.Element {
  return (
    <>
      <Header
        centerComponent={{ text: 'About', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
        leftComponent={<BackButton onPress={goBack} />}
      />
      <View style={style.bodyContainer}>
        <Text>About</Text>
      </View>
    </>
  );
}

export default function SettingsScreen(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName="Settings"
    >
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Restore" component={Restore} />
      <Stack.Screen name="Backup" component={Backup} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
