import React from 'react';
import { Modal, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

import mixins from '../../styles/mixins';

import styles from './ConfirmModal.style';

export interface ConfirmModalProps {
  open: boolean;

  onRequestClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  confirmButton?: boolean;
  cancelButton?: boolean;
  cancelOnBackgroundPress?: boolean;

  title?: string;
  confirmText?: string;
  cancelText?: string;

  children?: React.ReactNode,
}

export default function ConfirmModal({
  open,
  onRequestClose,
  onConfirm = () => {},
  onCancel = () => {},
  title,
  confirmButton = true,
  cancelButton = true,
  cancelOnBackgroundPress = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}: ConfirmModalProps): JSX.Element {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onRequestClose}
    >
      <View style={styles.modalOuterContainer}>
        <TouchableWithoutFeedback onPress={() => {
          if (cancelOnBackgroundPress) {
            onRequestClose();
            onCancel();
          }
        }}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View>
            {children}
          </View>
          <View style={[mixins.buttonGroup, styles.buttonGroupContainer]}>
            {cancelButton ? (
              <Button
                buttonStyle={styles.buttonSecondary}
                containerStyle={mixins.buttonContainer}
                titleStyle={styles.buttonSecondaryTitle}
                title={cancelText}
                onPress={() => {
                  onRequestClose();
                  onCancel();
                }}
              />
            ) : null}
            { cancelButton && confirmButton ? (
              <View style={mixins.buttonSeparator} />
            ) : null }
            {confirmButton ? (
              <Button
                buttonStyle={styles.buttonPrimary}
                containerStyle={mixins.buttonContainer}
                titleStyle={mixins.buttonTitle}
                title={confirmText}
                onPress={() => {
                  onRequestClose();
                  onConfirm();
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
