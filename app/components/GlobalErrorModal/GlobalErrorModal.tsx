import React from 'react';
import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import RNExitApp from 'react-native-exit-app';

import { useAppDispatch, useDynamicStyles } from '../../hooks';
import { clearGlobalError, selectWalletState } from '../../store/slices/wallet';
import { ConfirmModal } from '..';

export default function GlobalErrorModal(): JSX.Element {
  const dispatch = useAppDispatch();
  const { mixins } = useDynamicStyles();
  const { globalError } = useSelector(selectWalletState);
  const isModalOpen = globalError !== null;
  
  function onRequestClose(): void {
    if (globalError?.fatal) {
      RNExitApp.exitApp();
    }

    dispatch(clearGlobalError());
  }

  return (
    <ConfirmModal
      open={isModalOpen}
      onRequestClose={onRequestClose}
      title={globalError?.title}
      cancelButton={false}
      confirmText="Close"
      cancelOnBackgroundPress
    >
      <Text style={mixins.modalBodyText}>{globalError?.message}</Text>
    </ConfirmModal>
  );
}