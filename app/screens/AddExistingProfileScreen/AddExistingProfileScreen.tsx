import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { theme, mixins } from '../../styles';
import { NavHeader, RestoreItemModal } from '../../components';

import styles from './AddExistingProfileScreen.styles';
import { AddExistingProfileScreenProps } from './AddExistingProfileScreen.d';
import { ProfileRecord } from '../../model';
import { importProfile, ReportDetails } from '../../lib/import';
import { HumanReadableError } from '../../lib/error';
import { useDispatch } from 'react-redux';
import { getAllRecords } from '../../store';
import { RestoreModalState, SubmitPasswordCallback } from '../../components/RestoreItemModal/RestoreItemModal.d';


export default function AddExistingProfileScreen({ navigation }: AddExistingProfileScreenProps): JSX.Element {
  const [modalState, setModalState] = useState(RestoreModalState.Hidden);  
  const [reportDetails, setReportDetails] = useState<ReportDetails>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const onSubmitPassword = useRef<SubmitPasswordCallback>();
  const dispatch = useDispatch();

  const reportSummary = reportDetails ? Object.keys(reportDetails).join('\n') : '';

  async function onReadQRCode(text: string) {
    try {
      await ProfileRecord.importProfileRecord(text);
      await dispatch(getAllRecords());
    } catch (err) {
      console.error(err);
      throw new HumanReadableError('Unable to import profile');
    }

    navigation.navigate('ManageProfilesScreen');
  }

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
      const reportDetails = await importProfile({
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

  function onPressScanQRCode() {
    navigation.navigate('ProfileQRScreen', {
      onReadQRCode,
      instructionText: 'Scan a valid QR code to add an existing profile.',
    });
  }

  function goToDetails() {
    setModalState(RestoreModalState.Hidden);

    if (reportDetails === undefined) {
      throw new Error('No import report details');
    }

    navigation.navigate('DetailsScreen', {
      header: 'Existing Profile Details',
      details: reportDetails,
      goBack: () => navigation.navigate('ManageProfilesScreen'),
    });
  }

  function onRequestClose() {
    setModalState(RestoreModalState.Hidden);
    navigation.navigate('ManageProfilesScreen');
  }

  return (
    <>
      <NavHeader title="Add Existing Profile" goBack={navigation.goBack} />
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          To add an existing profile, scan a valid QR code or upload a wallet
          file (.json) from your device.
        </Text>
        <Button
          title="Scan QR code"
          buttonStyle={mixins.buttonIconCompact}
          containerStyle={mixins.buttonContainerVertical}
          titleStyle={mixins.buttonIconTitle}
          iconRight
          onPress={onPressScanQRCode}
          icon={
            <MaterialIcons
              name="qr-code-scanner"
              size={theme.iconSize}
              color={theme.color.iconInactive}
            />
          }
        />
        <Button
          title="Restore from a file"
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
        textConfig={restoreProfileTextConfig}
      />
    </>
  );
}

const restoreProfileTextConfig = {
  loadingTitle: 'Adding Existing Profile',
  lockedTitle: 'Profile Locked',
  lockedBody: 'Enter the correct password to add this profile to your wallet.',
  finishedTitle: 'Existing Profile Added',
  errorBody: 'The profile could not be added to your wallet.',
};
