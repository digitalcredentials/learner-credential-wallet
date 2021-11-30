import React, { useEffect, useState } from 'react';
import { Modal, Text, View, TouchableWithoutFeedback, AccessibilityInfo } from 'react-native';
import { Button } from 'react-native-elements';

import { mixins } from '../../styles';
import { useAccessibilityFocus } from '../../hooks';

import styles from './ConfirmModal.style';

export type ConfirmModalProps = React.PropsWithChildren<{
  open: boolean;

  onRequestClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  confirmButton?: boolean;
  cancelButton?: boolean;
  cancelOnBackgroundPress?: boolean;
  accessibilityFocusContent?: boolean;

  title?: string;
  confirmText?: string;
  cancelText?: string;
}>

export default function ConfirmModal({
  open,
  onRequestClose,
  onConfirm = () => {},
  onCancel = () => {},
  title,
  confirmButton = true,
  cancelButton = true,
  cancelOnBackgroundPress = false,
  accessibilityFocusContent = false,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}: ConfirmModalProps): JSX.Element {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [titleRef, focusTitle] = useAccessibilityFocus<Text>();
  const [contentRef, focusContent] = useAccessibilityFocus<View>();

  useEffect(() => {
    if (!isFirstRender) {
      AccessibilityInfo.announceForAccessibility(`Modal ${open ? 'open' : 'closed'}`);
    } else {
      setIsFirstRender(false);
    }
  }, [open]);

  function onContentLayout() {
    accessibilityFocusContent ? focusContent() : focusTitle();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={onRequestClose}
      accessibilityViewIsModal={true}
      accessible={false}
    >
      <View style={styles.modalOuterContainer}>
        <TouchableWithoutFeedback accessible={false} importantForAccessibility="no" onPress={() => {
          if (cancelOnBackgroundPress) {
            onRequestClose();
            onCancel();
          }
        }}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text 
            style={styles.modalTitle}
            ref={titleRef}
            accessibilityRole="header"
          >{title}</Text>
          <View ref={contentRef} onLayout={onContentLayout}>
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
