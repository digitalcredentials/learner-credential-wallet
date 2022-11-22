import { ConfirmModalProps, ConfirmModalDisplayProps } from '..';

type GlobalModalProps = {
  body?: string | React.ReactNode;
};

export type DisplayGlobalModalPayload = ConfirmModalDisplayProps & GlobalModalProps;
export type GlobalModalPayload = ConfirmModalProps & GlobalModalProps;
