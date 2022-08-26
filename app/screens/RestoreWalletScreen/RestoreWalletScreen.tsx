import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import { NavHeader, RestoreItemModal } from '../../components';

import styles from './RestoreWalletScreen.styles';
import { RestoreWalletScreenProps } from './RestoreWalletScreen.d';
import { importWallet, ReportDetails } from '../../lib/import';
import { HumanReadableError } from '../../lib/error';
import { useDispatch } from 'react-redux';
import { getAllRecords } from '../../store';
import { RestoreModalState, SubmitPasswordCallback } from '../../components/RestoreItemModal/RestoreItemModal.d';

export default function RestoreWalletScreen({ navigation }: RestoreWalletScreenProps): JSX.Element {
  const [modalState, setModalState] = useState(RestoreModalState.Hidden);  
  const [reportDetails, setReportDetails] = useState<ReportDetails>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const onSubmitPassword = useRef<SubmitPasswordCallback>();
  const dispatch = useDispatch();

  const reportSummary = reportDetails ? Object.keys(reportDetails).join('\n') : '';

  async function onRequestPassword() {
    return new Promise<string>((resolve) => {
      onSubmitPassword.current = (password) => {
        setModalState(RestoreModalState.Loading);
        resolve(password);
      };
      setModalState(RestoreModalState.Password);
    });
  } 

  async function onPressRestoreFromFile() {
    try {
      const reportDetails = await importWallet({
        onImportStart: () => setModalState(RestoreModalState.Loading),
        onRequestPassword,
      });

      await dispatch(getAllRecords());

      setReportDetails(reportDetails);
      setModalState(RestoreModalState.Details);
    } catch (err) {
      if (err instanceof HumanReadableError) {
        setErrorMessage(err.message);
      } else {
        console.error(err);
        setErrorMessage('Something went wrong');
      }

      setModalState(RestoreModalState.Error);
    }
  }

  function goToDetails() {
    setModalState(RestoreModalState.Hidden);

    if (reportDetails === undefined) {
      throw new Error('No import report details');
    }

    navigation.navigate('DetailsScreen', {
      header: 'Restored Wallet Details',
      details: reportDetails,
    });
  }

  function onRequestClose() {
    setModalState(RestoreModalState.Hidden);
    navigation.navigate('Settings');
  }

  return (
    <>
      <NavHeader title="Restore" goBack={navigation.goBack} />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Select a wallet file (.json) from your device to restore from.
        </Text>
        <Button
          title="Choose a file"
          buttonStyle={mixins.buttonIconCompact}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={onPressRestoreFromFile}
          icon={
            <MaterialCommunityIcons
              name="file-upload"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
      </View>
      <RestoreItemModal
        onPressDetails={goToDetails}
        reportSummary={reportSummary}
        modalState={modalState}
        errorMessage={errorMessage}
        onSubmitPassword={onSubmitPassword.current}
        onRequestClose={onRequestClose}
        textConfig={restoreWalletTextConfig}
      />
    </>
  );
}

const restoreWalletTextConfig = {
  loadingTitle: 'Restoring From File',
  lockedTitle: 'Wallet Locked',
  lockedBody: 'Enter the correct password restore this wallet.',
  finishedTitle: 'Restore Complete',
  errorBody: 'The wallet could not be restored.',
};
