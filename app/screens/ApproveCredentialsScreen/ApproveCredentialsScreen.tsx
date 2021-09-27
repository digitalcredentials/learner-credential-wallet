import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import { navigationRef } from '../../../App';
import { getAllCredentials } from '../../store/slices/wallet';
import type { Credential } from '../../types/credential';
import { CredentialRecord } from '../../model';
import { CredentialItem } from '../../components';
import { NavHeader } from '../../components';
import { theme } from '../../styles';
import { ApproveCredentialsScreenProps, RenderItemProps } from './ApproveCredentialsScreen.d';
import styles from './ApproveCredentialsScreen.styles';

enum ApprovalStatus {
  Pending = 'None',
  Accepted = 'Added to Wallet',
  Rejected = 'Credential Declined',
  Errored = 'Credential Failed to Add',
}

enum StatusIcon {
  Schedule = 'schedule',
  Close = 'close',
  Done = 'done',
}

type ApprovalControlsProps = {
  add: () => Promise<void>,
};

type CredentialStatusProps = {
  status: ApprovalStatus;
};

const iconFor = (status: ApprovalStatus): StatusIcon => ({
  [ApprovalStatus.Pending]: StatusIcon.Schedule,
  [ApprovalStatus.Errored]: StatusIcon.Close,
  [ApprovalStatus.Rejected]: StatusIcon.Close,
  [ApprovalStatus.Accepted]: StatusIcon.Done,
})[status];

function CredentialStatus({ status }: CredentialStatusProps) {
  return (
    <View style={styles.credentialStatusContainer}>
      <MaterialIcons
        name={iconFor(status)}
        size={theme.iconSize}
        color={theme.color.success}
      />
      <Text style={styles.statusText}>
        {status}
      </Text>
    </View>
  );
}

function ApprovalControls({ add }: ApprovalControlsProps) {
  const [ approvalStatus, setApprovalStatus ] = useState(ApprovalStatus.Pending);

  async function accept() {
    try {
      await add();

      setApprovalStatus(ApprovalStatus.Accepted);
    } catch (err) {
      console.warn(err);

      setApprovalStatus(ApprovalStatus.Errored);
    }
  }

  if (approvalStatus === ApprovalStatus.Pending) {
    return (
      <>
        <Button
          title="Decline"
          onPress={() => setApprovalStatus(ApprovalStatus.Rejected)}
        />
        <Button title="Accept" onPress={accept} />
      </>
    );
  } else {
    return <CredentialStatus status={approvalStatus} />;
  }
}

export default function ApproveCredentialsScreen({ route, navigation }: ApproveCredentialsScreenProps): JSX.Element {
  const dispatch = useDispatch();
  const { rawCredentialRecords } = route.params;

  async function add(credential: Credential): Promise<void> {
    await CredentialRecord.addCredential(CredentialRecord.rawFrom(credential));
    dispatch(getAllCredentials());
  }

  function goToHome() {
    if (navigationRef.isReady()) {
      navigationRef.navigate('CredentialNavigation', { screen: 'HomeScreen' });
    }
  }

  function Done(): JSX.Element {
    return (
      <Button
        buttonStyle={styles.doneButton}
        titleStyle={styles.doneButtonTitle}
        onPress={goToHome}
        title="Done"
      />
    );
  }

  function renderItem({ item }: RenderItemProps) {
    const { credential } = item;
    const { credentialSubject, issuer } = credential;
    const title = credentialSubject.hasCredential?.name ?? '';
    const issuerName = (typeof issuer === 'string' ? '' : issuer?.name) ?? '';
    const onSelect = () => navigation.navigate('ApproveCredentialScreen', { rawCredentialRecord: item });
    const image = null; // TODO: Decide where to pull image from.

    return (
      <CredentialItem
        title={title}
        subtitle={issuerName}
        image={image}
        onSelect={onSelect}
        bottomElement={<ApprovalControls add={() => add(credential)} />}
      />
    );
  }

  return (
    <View>
      <NavHeader
        title="Available Credentials"
        goBack={() => navigation.goBack()}
        rightComponent={<Done />}
      />
      <FlatList
        style={styles.approveCredentialContainer}
        data={rawCredentialRecords}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${item._id}`}
      />
    </View>
  );
}
