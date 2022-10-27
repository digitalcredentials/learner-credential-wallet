import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import {  CheckBox } from 'react-native-elements';
import { ConfirmModal, LoadingIndicatorDots, PasswordForm } from '..';

import { TouchableOpacity } from 'react-native';
import { useAsyncCallback } from 'react-async-hook';

import dynamicStyleSheet from './BackupItemModal.styles';
import { BackupItemModalProps } from './BackupItemModal.d';
import { useDynamicStyles } from '../../hooks';


export default function BackupItemModal({ onRequestClose, open, onBackup, backupItemName, backupModalText }: BackupItemModalProps): JSX.Element {
  const { styles, mixins, theme } = useDynamicStyles(dynamicStyleSheet);
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState<string>();

  const createBackup = useAsyncCallback(
    () => onBackup(enablePassword ? password : undefined),
    { onSuccess: onRequestClose, onError: onRequestClose }
  );

  const readyToBackup = !(enablePassword && !password);

  if (createBackup.loading) {
    return <ConfirmModal
      title={`Backing Up Your ${backupItemName}`}
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
      open={open}
      onCancel={onRequestClose}
      onConfirm={createBackup.execute}
      title={`Backup ${backupItemName}`}
      cancelText="Cancel"
      confirmText="Create Backup"
      confirmButtonDisabled={!readyToBackup}
    >
      <Text style={mixins.modalBodyText}>
        {backupModalText}
      </Text>
      <TouchableOpacity onPress={() => setEnablePassword(!enablePassword)}>
        <View style={styles.checkboxButtonContainer}>
          <CheckBox
            checked={enablePassword}
            onPress={ () => setEnablePassword(!enablePassword)}
            checkedColor={theme.color.buttonPrimary}
            containerStyle={[
              mixins.checkboxContainer,
              styles.checkboxContainer,
            ]}
          />
          <Text style={styles.checkboxText}>Add password protection</Text>
        </View>
      </TouchableOpacity>
      {enablePassword ? (
        <PasswordForm
          onChangePassword={setPassword}
          style={styles.passwordForm}
          textInputBackgroundColor={theme.color.foregroundPrimary}
        />
      ) : (
        <Text style={styles.noteText}>Note: Not password protecting your backup will leave your backup vulnerable.</Text>
      )}
    </ConfirmModal>
  );
}
