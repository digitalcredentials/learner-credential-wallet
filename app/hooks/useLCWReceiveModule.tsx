import React, { useEffect } from 'react';
import { AppState, NativeEventEmitter, NativeModule, NativeModules, Platform, Text } from 'react-native';
import { LoadingIndicatorDots } from '../components';
import { performDidAuthRequest } from '../lib/didAuthRequest';
import { clearGlobalModal, displayGlobalModal } from '../lib/globalModal';
import { NavigationUtil } from '../lib/navigationUtil';
import { navigationRef } from '../navigation';
import { stageCredentials } from '../store/slices/credentialFoyer';
import { useAppDispatch } from './useAppDispatch';
import { useDynamicStyles } from './useDynamicStyles';

type LCWReceiveModule = NativeModule & {
  getConstants: () => LCWReceiveModuleConstants;
  getData: () => void;
}

type LCWReceiveModuleConstants = {
  CREDENTIAL_RECEIVED_EVENT: string;
  DID_AUTH_RECEIVED_EVENT: string;
  CREDENTIAL: string;
  DID_AUTH: string;
}

type LCWReceiveModuleEvent = Record<string, string>;

let LCWReceiveModule: LCWReceiveModule;
let CREDENTIAL_RECEIVED_EVENT: string;
let DID_AUTH_RECEIVED_EVENT: string;
let CREDENTIAL: string;
let DID_AUTH: string;

if (Platform.OS === 'android') {
  LCWReceiveModule = NativeModules.LCWReceiveModule;
  const constants = LCWReceiveModule.getConstants();
  CREDENTIAL_RECEIVED_EVENT = constants.CREDENTIAL_RECEIVED_EVENT;
  DID_AUTH_RECEIVED_EVENT = constants.DID_AUTH_RECEIVED_EVENT;
  CREDENTIAL = constants.CREDENTIAL;
  DID_AUTH = constants.DID_AUTH;
}

export function useLCWReceiveModule(): void {
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

  const onCredentialReceived = async (event: LCWReceiveModuleEvent) => {
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
          rawProfileRecord,
        }
      });
    }
  };

  const onDidAuthReceived = async (event: LCWReceiveModuleEvent) => {
    displayGlobalModal(dataLoadingModalState);
    const didAuthString = event[DID_AUTH];
    const didAuthRequest = JSON.parse(didAuthString);

    if (navigationRef.isReady()) {
      clearGlobalModal();
      const rawProfileRecord = await NavigationUtil.selectProfile();
      await performDidAuthRequest(didAuthRequest, rawProfileRecord);

      navigationRef.navigate('AcceptCredentialsNavigation',{
        screen: 'ApproveCredentialsScreen',
        params: {  
          rawProfileRecord,
        }
      });
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      const eventEmitter = new NativeEventEmitter(LCWReceiveModule);
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
            LCWReceiveModule.getData();
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