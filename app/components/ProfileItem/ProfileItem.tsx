import React, { useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { useAsyncCallback } from 'react-async-hook';
import { TextInput } from 'react-native-paper';
import { Button, CheckBox } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { MoreMenuButton, MenuItem, ConfirmModal, PasswordForm, LoadingIndicatorDots } from '../';
import styles from './ProfileItem.styles';
import { ActionModalProps, ProfileItemProps } from './ProfileItem.d';
import { mixins, theme } from '../../styles';
import { navigationRef } from '../../navigation';

enum ActiveModal {
  Rename,
  Delete,
  Backup,
}

export default function ProfileItem({ profile }: ProfileItemProps): JSX.Element {
  const [activeModal, setActiveModal] = useState<ActiveModal | null>(null);

  function goToSource() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', {
        screen: 'SettingsNavigation',
        params: {
          screen: 'ViewSourceScreen',
          params: {
            data: profile
          },
        },
      });

      setActiveModal(null);
    }
  }

  const modalContent = useMemo(() => {
    if (activeModal === null) return null;

    const actionProps = { 
      profile,
      onRequestClose: () => setActiveModal(null)
    };

    return {
      [ActiveModal.Rename]: <RenameModal {...actionProps} />,
      [ActiveModal.Backup]: <BackupModal {...actionProps} />,
      [ActiveModal.Delete]: <DeleteModal {...actionProps} />,
      
    }[activeModal];
  }, [activeModal]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{profile.name}</Text>
          <Text style={styles.subtitleText}>
            {profile.credentials.length} {credentialUnit(profile.credentials.length)}
          </Text>
        </View>
        <MoreMenuButton>
          <MenuItem title="Rename" onPress={() => setActiveModal(ActiveModal.Rename)} />
          <MenuItem title="Backup" onPress={() => setActiveModal(ActiveModal.Backup)} />
          <MenuItem title="View Source" onPress={goToSource} />
          <MenuItem title="Delete" onPress={() => setActiveModal(ActiveModal.Delete)} />
        </MoreMenuButton>
      </View>
      {modalContent}
    </>
  );
}

function RenameModal({ profile, onRequestClose }: ActionModalProps): JSX.Element {
  const [newName, setNewName] = useState(profile.name);

  function onSave() {
    // PROFILE TODO: Add profile rename method

    onRequestClose();
  }

  return (
    <ConfirmModal
      open
      onRequestClose={onRequestClose}
      onConfirm={onSave}
      title="Rename Profile"
      cancelText="Cancel"
      confirmText="Save"
    >
      <TextInput
        value={newName}
        onChangeText={setNewName}
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
  );
}

function BackupModal({ profile, onRequestClose }: ActionModalProps): JSX.Element {
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState<string>();

  // PROFILE TODO: Use backup profile method
  const backupProfile = () => new Promise((res) => setTimeout(res, 3000));

  const createBackup = useAsyncCallback((backupProfile), { onSuccess: onRequestClose });
  const readyToBackup = !(enablePassword && !password);

  if (createBackup.loading) {
    return <ConfirmModal 
      title="Backing Up Your Profile"
      confirmButton={false}
      cancelButton={false}
    >
      <>
        <Text style={mixins.modalBodyText}>
          This will only take a moment.
        </Text>
        <LoadingIndicatorDots />
      </>
    </ConfirmModal>;
  }

  return (
    <ConfirmModal
      open
      onCancel={onRequestClose}
      onConfirm={createBackup.execute}
      title="Backup Profile"
      cancelText="Cancel"
      confirmText="Create Backup"
      confirmButtonDisabled={!readyToBackup}
    >
      <Text style={mixins.modalBodyText}>
        This will backup your profile and its contents into a file for you to
        download.
      </Text>
      <TouchableWithoutFeedback onPress={() => setEnablePassword(!enablePassword)}>
        <View style={styles.checkboxButtonContainer}>
          <CheckBox
            checked={enablePassword}
            checkedColor={theme.color.buttonPrimary}
            containerStyle={[
              mixins.checkboxContainer,
              styles.checkboxContainer,
            ]}
          />
          <Text style={styles.checkboxText}>Add password protection</Text>
        </View>
      </TouchableWithoutFeedback>
      {enablePassword && (
        <PasswordForm
          onChangePassword={setPassword}
          style={styles.passwordForm}
          textInputBackgroundColor={theme.color.foregroundPrimary}
        />
      )}
    </ConfirmModal>
  );
}

function DeleteModal({ profile, onRequestClose }: ActionModalProps): JSX.Element {
  function onDelete() {
    // PROFILE TODO: Add profile delete method
  }

  function goToDetails() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('HomeNavigation', {
        screen: 'SettingsNavigation',
        params: {
          screen: 'DetailsScreen',
          params: {
            header: 'Delete Profile Details',
            details: {
              [`${profile.credentials.length} total credential`]:
                profile.credentials,
            },
          },
        },
      });

      onRequestClose();
    }
  }

  return (
    <ConfirmModal
      open
      onRequestClose={onRequestClose}
      onConfirm={onDelete}
      title="Delete Profile"
      cancelText="Cancel"
      confirmText="Delete Profile"
    >
      <Text style={mixins.modalBodyText}>
        Are you sure you want to delete {profile.name} and its {profile.credentials.length} {credentialUnit(profile.credentials.length)}?
      </Text>
      <Button
        buttonStyle={mixins.buttonClear}
        titleStyle={[mixins.buttonClearTitle, styles.underline]}
        containerStyle={mixins.buttonClearContainer}
        title="Details"
        onPress={goToDetails}
      />
    </ConfirmModal>
  );
}

function credentialUnit(count: number,): string {
  return count === 1 ? 'credential' : 'credentials';
}
