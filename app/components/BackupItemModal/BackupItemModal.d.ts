export type BackupItemModalProps = {
  onRequestClose: () => void;
  open?: boolean;
  onBackup: (password: string | undefined) => Promise<void>;
  backupItemName: string;
  backupModalText: string;
};
