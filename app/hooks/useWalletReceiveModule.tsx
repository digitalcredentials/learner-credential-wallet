import React, { useEffect } from 'react';
import { AppState, NativeEventEmitter, NativeModule, NativeModules, Platform, Text } from 'react-native';
import { LoadingIndicatorDots } from '../components';
import { performDidAuthRequest } from '../lib/didAuthRequest';
import { clearGlobalModal, displayGlobalModal } from '../lib/globalModal';
import { NavigationUtil } from '../lib/navigationUtil';
import { navigationRef } from '../navigation';
import { stageCredentials } from '../store/slices/credentialFoyer';
import { useAppDispatch, useDynamicStyles } from '.';

type WalletReceiveModule = NativeModule & {
  getConstants: () => WalletReceiveModuleConstants;
  getData: () => void;
}

type WalletReceiveModuleConstants = {
  CREDENTIAL_RECEIVED_EVENT: string;
  DID_AUTH_RECEIVED_EVENT: string;
  CREDENTIAL: string;
  DID_AUTH: string;
}

type ReceiveModuleEventType = Record<string, string>;

let WalletReceiveModule: WalletReceiveModule;
let CREDENTIAL_RECEIVED_EVENT: string;
let DID_AUTH_RECEIVED_EVENT: string;
let CREDENTIAL: string;
let DID_AUTH: string;

if (Platform.OS === 'android') {
  WalletReceiveModule = NativeModules.WalletReceiveModule;
  const constants = WalletReceiveModule.getConstants();
  CREDENTIAL_RECEIVED_EVENT = constants.CREDENTIAL_RECEIVED_EVENT;
  DID_AUTH_RECEIVED_EVENT = constants.DID_AUTH_RECEIVED_EVENT;
  CREDENTIAL = constants.CREDENTIAL;
  DID_AUTH = constants.DID_AUTH;
}

export function useWalletReceiveModule(): void {
  const dispatch = useAppDispatch();
  const { mixins } = useDynamicStyles();

  const dataLoadingModalState = {
    title: 'Retrieving Credential',
    confirmButton: false,
    cancelButton: false,
    body: (
      <>
        <Text style={mixins.modalBodyText}>
          This will only take a moment.
        </Text>
        <LoadingIndicatorDots />
      </>
    )
  };

  const onCredentialReceived = async (event: ReceiveModuleEventType) => {
    displayGlobalModal(dataLoadingModalState);
    const credentialString = event[CREDENTIAL];
    const credential = JSON.parse(credentialString);
    clearGlobalModal();

    await dispatch(stageCredentials([credential]));
    const rawProfileRecord = await NavigationUtil.selectProfile();

    if (navigationRef.isReady()) {
      navigationRef.navigate('AcceptCredentialsNavigation', {
        screen: 'ApproveCredentialsScreen',
        params: {
          rawProfileRecord
        }
      });
    }
  };

  const onDidAuthReceived = async (event: ReceiveModuleEventType) => {
    displayGlobalModal(dataLoadingModalState);
    const didAuthString = event[DID_AUTH];
    const didAuthRequest = JSON.parse(didAuthString);

    if (navigationRef.isReady()) {
      clearGlobalModal();
      const rawProfileRecord = await NavigationUtil.selectProfile();
      await performDidAuthRequest(didAuthRequest, rawProfileRecord);

      navigationRef.navigate('AcceptCredentialsNavigation', {
        screen: 'ApproveCredentialsScreen',
        params: {
          rawProfileRecord
        }
      });
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter(WalletReceiveModule);
      const credentialSubscription = eventEmitter.addListener(
        CREDENTIAL_RECEIVED_EVENT,
        onCredentialReceived
      );
      const didSubscription = eventEmitter.addListener(
        DID_AUTH_RECEIVED_EVENT,
        onDidAuthReceived
      );

      const appStateSubscription = AppState.addEventListener(
        'change',
        (state) => {
          if (state === 'active') {
            WalletReceiveModule.getData();
          }
        }
      );

      return () => {
        credentialSubscription.remove();
        didSubscription.remove();
        appStateSubscription.remove();
      };
    }
  }, []);
}
