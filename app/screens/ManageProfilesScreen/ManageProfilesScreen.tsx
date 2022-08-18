import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import styles from './ManageProfilesScreen.styles';
import { ManageProfilesScreenProps } from './ManageProfilesScreen.d';
import { ConfirmModal, NavHeader, ProfileItem } from '../../components';
import { TextInput } from 'react-native-paper';

export default function ManageProfilesScreen({ navigation }: ManageProfilesScreenProps): JSX.Element {
  const [newProfileName, setNewProfileName] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  // PROFILE TODO: Connect to profile store
  const profiles = [
    { name: 'Default', credentials: ['Test 1'] },
    { name: 'School Creds', credentials: ['Test 2', 'Test 3']}
  ];

  async function onPressCreate() {}
  async function onPressAddExisting() {}

  const ListHeader = (
    <View>
      <Button
        title="Add New Profile"
        buttonStyle={mixins.buttonIconCompact}
        containerStyle={mixins.buttonContainerVertical}
        titleStyle={mixins.buttonIconTitle}
        iconRight
        onPress={() => setModalIsOpen(true)}
        icon={
          <MaterialIcons
            name="add-circle"
            size={theme.iconSize}
            color={theme.color.iconInactive}
          />
        }
      />
      <Button
        title="Add Existing Profile"
        buttonStyle={mixins.buttonIconCompact}
        containerStyle={mixins.buttonContainerVertical}
        titleStyle={mixins.buttonIconTitle}
        iconRight
        onPress={onPressAddExisting}
        icon={
          <MaterialIcons
            name="add-circle"
            size={theme.iconSize}
            color={theme.color.iconInactive}
          />
        }
      />
    </View>
  );

  return (
    <>
      <NavHeader title="Manage Profiles" goBack={navigation.goBack} />
      <ConfirmModal
        open={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onConfirm={onPressCreate}
        title="New Profile"
        cancelText="Cancel"
        confirmText="Create Profile"
      >
        <TextInput
          value={newProfileName}
          onChangeText={setNewProfileName}
          style={styles.input}
          outlineColor={theme.color.textPrimary}
          selectionColor={theme.color.foregroundPrimary}
          theme={{
            colors: {
              placeholder: theme.color.textPrimary,
              text: theme.color.textPrimary,
              primary: theme.color.brightAccent,
            },
          }}
          label="Profile Name"
          mode="outlined"
          keyboardAppearance="dark"
        />
      </ConfirmModal>
      <FlatList
        inverted
        ListFooterComponent={ListHeader}
        style={styles.container}
        data={profiles.reverse()}
        renderItem={({ item }) => 
          <ProfileItem profile={item} />
        }
      />
    </>
  );
}
