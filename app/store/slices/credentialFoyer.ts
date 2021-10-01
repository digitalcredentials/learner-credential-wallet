import uuid from 'react-native-uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Credential } from '../../types/credential';

export enum ApprovalStatus {
  Pending = 'None',
  Accepted = 'Added to Wallet',
  Rejected = 'Credential Declined',
  Errored = 'Credential Failed to Add',
}

export class PendingCredential {
  id: string = uuid.v4() as string;
  status: ApprovalStatus = ApprovalStatus.Pending;
  credential: Credential;

  constructor(credential: Credential) {
    this.credential = credential;
  }
}

export type CredentialFoyerState = {
  pendingCredentials: PendingCredential[];
};

const initialState: CredentialFoyerState = {
  pendingCredentials: [],
};

const not = <T>(predicate: (arg: T) => boolean) => (arg: T) => !predicate(arg);

const credentialFoyer = createSlice({
  name: 'credentialFoyer',
  initialState,
  reducers: {
    clearFoyer(state) {
      state.pendingCredentials = initialState.pendingCredentials;
    },
    stageCredentials(state, action: PayloadAction<Credential[]>) {
      state.pendingCredentials = action.payload.map((credential) => (
        new PendingCredential(credential)
      ));
    },
    setCredentialApproval(state, action: PayloadAction<PendingCredential>) {
      const isSubject = ({ id: given }: PendingCredential) => given === action.payload.id;
      const subject = state.pendingCredentials.find(isSubject);

      if (subject === undefined) return;

      return {
        ...state,
        pendingCredentials: [
          ...state.pendingCredentials.filter(not(isSubject)),
          {
            ...subject,
            status: action.payload.status,
          },
        ],
      };
    },
  },
});

export default credentialFoyer.reducer;
export const { clearFoyer, stageCredentials, setCredentialApproval } = credentialFoyer.actions;
