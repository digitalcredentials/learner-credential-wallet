import React, { useState } from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import { DebugScreen, VerificationStatusScreen } from '../../screens';
import {
  HomeNavigation,
  RootNavigationParamsList,
  AcceptCredentialsNavigation,
} from '../../navigation';
import { ConfirmModal } from '../../components';
import { useDynamicStyles } from '../../hooks';
import { clearGlobalError, selectWalletState } from '../../store/slices/wallet';

const Stack = createStackNavigator<RootNavigationParamsList>();

export default function RootNavigation(): JSX.Element {
  const dispatch = useDispatch();
  const { mixins } = useDynamicStyles();
  const { globalError } = useSelector(selectWalletState);
  const isModalOpen = globalError !== null;

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        <Stack.Screen name="DebugScreen" component={DebugScreen} />
        <Stack.Screen name="VerificationStatusScreen" component={VerificationStatusScreen} />
        <Stack.Screen name="AcceptCredentialsNavigation" component={AcceptCredentialsNavigation} />
      </Stack.Navigator>
      <ConfirmModal
        open={isModalOpen}
        onRequestClose={() => dispatch(clearGlobalError())}
        title={globalError?.title}
        cancelButton={false}
        confirmText="Close"
        cancelOnBackgroundPress
      >
        <Text style={mixins.modalBodyText}>{globalError?.message}</Text>
      </ConfirmModal>
    </>
  );
}
