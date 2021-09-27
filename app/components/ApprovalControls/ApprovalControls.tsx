import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { theme, Color } from '../../styles';
import styles from './ApprovalControls.styles';

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

const colorFor = (status: ApprovalStatus): Color  => ({
  [ApprovalStatus.Pending]: theme.color.success,
  [ApprovalStatus.Errored]: theme.color.error,
  [ApprovalStatus.Rejected]: theme.color.error,
  [ApprovalStatus.Accepted]: theme.color.success,
})[status];

function CredentialStatus({ status }: CredentialStatusProps): JSX.Element {
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

export default function ApprovalControls({ add }: ApprovalControlsProps): JSX.Element {
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

