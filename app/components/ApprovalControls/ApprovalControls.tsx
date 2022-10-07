import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useDynamicStyles } from '../../hooks';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

import {
  ApprovalStatus,
  ApprovalMessage,
  PendingCredential,
  setCredentialApproval,
} from '../../store/slices/credentialFoyer';
import { Color, ThemeType } from '../../styles';
import dynamicStyleSheet from './ApprovalControls.styles';
import type { Credential } from '../../types/credential';
import { useAccessibilityFocus } from '../../hooks';
import { addCredential } from '../../store/slices/credential';
import { ObjectID } from 'bson';

enum StatusIcon {
  Schedule = 'schedule',
  Close = 'close',
  Done = 'done',
}

type ApprovalControlsProps = {
  pendingCredential: PendingCredential;
  profileRecordId: ObjectID;
};

type ApprovalButtonProps = {
  title: string;
  onPress: () => void;
  primary?: boolean; 
}

const iconFor = (status: ApprovalStatus): StatusIcon => ({
  [ApprovalStatus.Pending]: StatusIcon.Schedule,
  [ApprovalStatus.PendingDuplicate]: StatusIcon.Schedule,
  [ApprovalStatus.Errored]: StatusIcon.Close,
  [ApprovalStatus.Rejected]: StatusIcon.Close,
  [ApprovalStatus.Accepted]: StatusIcon.Done,
})[status];

const colorFor = (status: ApprovalStatus, theme: ThemeType): Color  => ({
  [ApprovalStatus.Pending]: theme.color.success,
  [ApprovalStatus.PendingDuplicate]: theme.color.success,
  [ApprovalStatus.Errored]: theme.color.error,
  [ApprovalStatus.Rejected]: theme.color.error,
  [ApprovalStatus.Accepted]: theme.color.success,
})[status];

const defaultMessageFor = (status: ApprovalStatus): ApprovalMessage => ({
  [ApprovalStatus.Pending]: ApprovalMessage.Pending,
  [ApprovalStatus.PendingDuplicate]: ApprovalMessage.Duplicate,
  [ApprovalStatus.Accepted]: ApprovalMessage.Accepted,
  [ApprovalStatus.Rejected]: ApprovalMessage.Rejected,
  [ApprovalStatus.Errored]: ApprovalMessage.Errored,
})[status];

function ApprovalButton({ title, onPress, primary }: ApprovalButtonProps): JSX.Element {
  const { styles } = useDynamicStyles(dynamicStyleSheet);

  return (
    <TouchableOpacity
      style={[styles.button, primary && styles.buttonPrimary]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={[styles.buttonText, primary && styles.buttonTextPrimary]}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function ApprovalControls({ pendingCredential, profileRecordId }: ApprovalControlsProps): JSX.Element {
  const { styles, theme } = useDynamicStyles(dynamicStyleSheet);
  const dispatch = useAppDispatch();
  const { credential, status, messageOveride } = pendingCredential;
  const message = messageOveride || defaultMessageFor(status);
  const [statusRef, focusStatus] = useAccessibilityFocus<View>();

  async function add(credential: Credential): Promise<void> {
    await dispatch(addCredential({ credential, profileRecordId }));
  }

  function setApprovalStatus(status: ApprovalStatus) {
    dispatch(setCredentialApproval({
      ...pendingCredential,
      status,
    }));
  }

  function reject() {
    setApprovalStatus(ApprovalStatus.Rejected);
    focusStatus();
  }

  useEffect(focusStatus, []);

  async function accept() {
    try {
      await add(credential);

      setApprovalStatus(ApprovalStatus.Accepted);
    } catch (err) {
      console.warn(err);

      setApprovalStatus(ApprovalStatus.Errored);
    }
    focusStatus();
  }

  switch (status) {
  case ApprovalStatus.Pending:
    return (
      <View style={styles.approvalContainer}>
        <ApprovalButton title="Decline" onPress={reject} />
        <View style={styles.buttonSpacer} />
        <ApprovalButton title="Accept" onPress={accept} primary />
      </View>
    );
  case ApprovalStatus.PendingDuplicate:
    return (
      <>
        <View style={styles.approvalContainer}>
          <ApprovalButton title="Skip" onPress={reject} primary />
          <View style={styles.buttonSpacer} />
          <ApprovalButton title="Accept" onPress={accept} />
        </View>
        <Text style={styles.statusTextOutside}>{message}</Text>
      </>
    );
  default:
    return (
      <View style={styles.approvalContainer} accessible>
        <View style={styles.credentialStatusContainer} ref={statusRef}>
          <MaterialIcons
            color={colorFor(status, theme)}
            name={iconFor(status)}
            size={theme.iconSize}
          />
          <Text style={styles.statusText}>{message}</Text>
        </View>
      </View>
    );
  }
}
