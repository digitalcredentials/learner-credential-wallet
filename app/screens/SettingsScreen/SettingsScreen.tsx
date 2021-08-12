import React from 'react';
import { Text, View } from 'react-native';
import { Button, Header, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import mixins from '../../styles/mixins';
import style from './SettingsScreen.style';
import mockCredential from '../../mock/credential';
import {
  lock,
  addCredential,
} from '../../store/slices/wallet';

interface SettingsItemProps {
  readonly title: string;
  readonly onPress: () => void;
}

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

export default function SettingsScreen(): JSX.Element {
  const dispatch = useDispatch();
  return (
    <>
      <Header
        centerComponent={{ text: 'Settings', style: mixins.headerTitle}}
        containerStyle={mixins.headerContainer}
      />
      <View style={style.bodyContainer}>
        <SettingsItem title="Restore" onPress={() => void null} />
        <SettingsItem title="Backup" onPress={() => void null} />
        <SettingsItem title="About" onPress={() => void null} />
        <SettingsItem title="Sign out" onPress={() => dispatch(lock())} />
        <SettingsItem
          title="Add credential (dev)"
          onPress={() => dispatch(addCredential(mockCredential))}
        />
      </View>
    </>
  );
}
