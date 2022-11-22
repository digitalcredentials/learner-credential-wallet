export type ConfirmModalDisplayProps = {
  confirmButtonDisabled?: boolean;
  confirmButton?: boolean;
  cancelButton?: boolean;

  title?: string;
  confirmText?: string;
  cancelText?: string;
}

export type ConfirmModalProps = React.PropsWithChildren<ConfirmModalDisplayProps & {
  open?: boolean;
  onRequestClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  cancelOnBackgroundPress?: boolean;
  accessibilityFocusContent?: boolean;
}>
