import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {  CheckBox } from 'react-native-elements';
import { ConfirmModal, LoadingIndicatorDots, PasswordForm } from '..';
import { mixins, theme } from '../../styles';

import styles from './BackupItemModal.styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useAsyncCallback } from 'react-async-hook';
import { BackupItemModalProps } from './BackupItemModal.d';

export default function BackupItemModal({ onRequestClose, open, onBackup, backupItemName, backupModalText }: BackupItemModalProps): JSX.Element {
  const [enablePassword, setEnablePassword] = useState(false);
  const [password, setPassword] = useState<string>();

  const createBackup = useAsyncCallback(
    () => onBackup(enablePassword ? password : undefined),
    { onSuccess: onRequestClose }
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
      onRequestClose={onRequestClose}
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
