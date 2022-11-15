export type ConfirmModalProps = React.PropsWithChildren<{
  open?: boolean;

  onRequestClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;

  confirmButtonDisabled?: boolean;
  confirmButton?: boolean;
  cancelButton?: boolean;
  cancelOnBackgroundPress?: boolean;
  accessibilityFocusContent?: boolean;

  title?: string;
  confirmText?: string;
  cancelText?: string;
}>

export type ControlledConfirmModalProps = Pick<ConfirmModalProps, 'open' | 'onRequestClose' | 'onConfirm'>;
