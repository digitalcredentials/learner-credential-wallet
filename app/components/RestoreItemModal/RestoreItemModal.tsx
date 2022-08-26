import React, { useState } from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import { mixins } from '../../styles';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import LoadingIndicatorDots from '../LoadingIndicatorDots/LoadingIndicatorDots';
import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './RestoreItemModal.styles';
import { RestoreModalState, RestoreItemModalProps } from './RestoreItemModal.d';

export default function RestoreItemModal({
  modalState,
  onSubmitPassword,
  reportSummary,
  onPressDetails,
  errorMessage,
  onRequestClose,
  textConfig,
}: RestoreItemModalProps): JSX.Element | null {
  const [password, setPassword] = useState('');

  function _onSubmitPassword() {
    onSubmitPassword?.(password);
    setPassword('');
  }

  switch (modalState) {
  case RestoreModalState.Loading:
    return (
      <ConfirmModal 
        title={textConfig.loadingTitle}
        confirmButton={false}
        cancelButton={false}
      >
        <>
          <Text style={mixins.modalBodyText}>
            This will only take a moment.
          </Text>
          <LoadingIndicatorDots />
        </>
      </ConfirmModal>
    );
  case RestoreModalState.Password:
    return (
      <ConfirmModal
        onConfirm={_onSubmitPassword}
        title={textConfig.lockedTitle}
        cancelButton={false}
        confirmText="Submit"
      >
        <Text style={mixins.modalBodyText}>
          {textConfig.lockedBody}
        </Text>
        <PasswordInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.password}
        />
      </ConfirmModal>
    );
  case RestoreModalState.Details:
    return (
      <ConfirmModal
        title={textConfig.finishedTitle}
        cancelButton={false}
        confirmText="Close"
        onRequestClose={onRequestClose}
        cancelOnBackgroundPress
      >
        <Text style={mixins.modalBodyText}>{reportSummary}</Text>
        <Button
          buttonStyle={mixins.buttonClear}
          titleStyle={[mixins.buttonClearTitle, styles.underline]}
          containerStyle={mixins.buttonClearContainer}
          title="Details"
          onPress={onPressDetails}
        />
      </ConfirmModal>
    );
  case RestoreModalState.Error:
    return (
      <ConfirmModal
        title={errorMessage}
        cancelButton={false}
        confirmText="Close"
        onRequestClose={onRequestClose}
        cancelOnBackgroundPress
      >
        <Text style={mixins.modalBodyText}>{textConfig.errorBody}</Text>
      </ConfirmModal>
    );
  case RestoreModalState.Hidden: return null;
  default: return null;
  }
}

RestoreItemModal.ModalState = RestoreModalState;
