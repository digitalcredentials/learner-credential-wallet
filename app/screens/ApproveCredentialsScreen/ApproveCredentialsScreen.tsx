import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TouchableOpacity, View, FlatList } from 'react-native';
import { Button, Text } from 'react-native-elements';
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

const colorFor = (status: ApprovalStatus): string  => ({
  [ApprovalStatus.Pending]: theme.color.success,
  [ApprovalStatus.Errored]: theme.color.error,
  [ApprovalStatus.Rejected]: theme.color.error,
  [ApprovalStatus.Accepted]: theme.color.success,
})[status];

function CredentialStatus({ status }: CredentialStatusProps) {
  return (
    <View style={styles.credentialStatusContainer}>
      <MaterialIcons
        color={colorFor(status)}
        name={iconFor(status)}
        size={theme.iconSize}
      />
      <Text style={styles.statusText}>{status}</Text>
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
      <View style={styles.approvalContainer}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => setApprovalStatus(ApprovalStatus.Rejected)}
        >
          <Text style={styles.brightActionText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={accept}
        >
          <Text style={styles.darkActionText}>Accept</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.approvalContainer}>
        <CredentialStatus status={approvalStatus} />
      </View>
    );
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
