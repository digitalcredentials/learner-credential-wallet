export type SubmitPasswordCallback = (password: string) => void;

export enum RestoreModalState {
  Loading,
  Password,
  Details,
  Error,
  Hidden,
}

export type RestoreItemModalProps = {
  modalState: RestoreModalState,
  onSubmitPassword: SubmitPasswordCallback | undefined,
  reportSummary: string,
  onPressDetails: () => void,
  errorMessage: string | undefined,
  onRequestClose: () => void,
  textConfig: {
    loadingTitle: string,
    lockedTitle: string,
    lockedBody: string,
    finishedTitle: string,
    errorBody: string,
  }
}
