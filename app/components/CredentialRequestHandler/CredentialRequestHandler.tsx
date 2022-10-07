import React, { useEffect, useState } from 'react';
import { useAsyncCallback } from 'react-async-hook';
import { Text, View } from 'react-native';
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useAppDispatch, useDynamicStyles, useSelectorFactory } from '../../hooks';
import { isCredentialRequestParams, requestCredential } from '../../lib/request';
import { ProfileRecordRaw } from '../../model';
import { makeSelectDidFromProfile } from '../../store/selectorFactories';
import dynamicStyleSheet from './CredentialRequestHandler.styles';
import { Credential } from '../../types/credential';
import { stageCredentials } from '../../store/slices/credentialFoyer';

type CredentialRequestHandlerProps = {
  credentialRequestParams?: Record<string, unknown>;
  rawProfileRecord: ProfileRecordRaw;
  onFailed: () => void;
}

export default function CredentialRequestHandler({ credentialRequestParams, rawProfileRecord, onFailed }: CredentialRequestHandlerProps): JSX.Element {
  const { styles } = useDynamicStyles(dynamicStyleSheet);
  const dispatch = useAppDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const rawDidRecord = useSelectorFactory(makeSelectDidFromProfile, { rawProfileRecord });

  const credentialRequest = useAsyncCallback(requestCredential, { onSuccess: onFinish });
  const errorMessage = credentialRequest.error?.message;

  async function onFinish(credentials: Credential[]) {
    setModalIsOpen(false);
    await dispatch(stageCredentials(credentials));
  }

  function onRequestClose() {
    setModalIsOpen(false);
    if (errorMessage) {
      onFailed();
    }
  }

  useEffect(() => {
    if (isCredentialRequestParams(credentialRequestParams)) {
      setModalIsOpen(true);
      credentialRequest.execute(credentialRequestParams, rawDidRecord);
    }
  }, [credentialRequestParams, rawProfileRecord]);

  console.log(credentialRequest.loading);

  return (
    <ConfirmModal
      open={modalIsOpen}
      onRequestClose={onRequestClose}
      confirmButton={!credentialRequest.loading}
      cancelOnBackgroundPress={!credentialRequest.loading}
      cancelButton={false}
      title="Handling Credential Request"
      confirmText="Close"
    >
      {credentialRequest.loading ? (
        <View style={styles.loadingContainer}> 
          <AnimatedEllipsis style={styles.loadingDots} minOpacity={0.4} animationDelay={200}/>
        </View>
      ) : (
        <Text style={styles.modalText}>{errorMessage}</Text>
      )}
    </ConfirmModal>
  );
}