import { ComponentType } from 'react';
import { ControlledConfirmModalProps } from '../../components';
import type { CredentialRecordRaw } from '../../model/credential';
export type { ShareHomeScreenProps } from '../../navigation';

export type RenderItemProps = {
  item: CredentialRecordRaw;
  index: number;
};

export type CredentialSelectionConfirmModalProps = ControlledConfirmModalProps & {
  selectedCredentials: CredentialRecordRaw[];
}

export type CredentialSelectionScreenParams = {
  title: string;
  instructionText: string;
  confirmModal?: ComponentType<CredentialSelectionConfirmModalProps>;
  singleSelect?: boolean;
  onSelect?: (selectedCredentials: CredentialRecordRaw[]) => void;
};
