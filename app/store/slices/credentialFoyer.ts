import uuid from 'react-native-uuid';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { CredentialRecord } from '../../model';
import type { Credential } from '../../types/credential';

export enum ApprovalStatus {
  Pending,
  Accepted,
  Rejected,
  Errored,
}

export enum ApprovalMessage {
  Pending = 'None',
  Accepted = 'Added to Wallet',
  Rejected = 'Credential Declined',
  Errored = 'Credential Failed to Add',
  Duplicate = 'Already in Wallet',
}

export class PendingCredential {
  id: string = uuid.v4() as string;
  status: ApprovalStatus;
  credential: Credential;
  messageOveride?: ApprovalMessage;

  constructor(
    credential: Credential, 
    status: ApprovalStatus = ApprovalStatus.Pending, 
    messageOveride?: ApprovalMessage,
  ) {
    this.credential = credential;
    this.status = status;
    this.messageOveride = messageOveride;
  }
}

export type CredentialFoyerState = {
  pendingCredentials: PendingCredential[];
};

const initialState: CredentialFoyerState = {
  pendingCredentials: [],
};

const stageCredentials = createAsyncThunk('credentialFoyer/stageCredentials', async (credentials: Credential[]) => {
  const existingCredentials = await CredentialRecord.getAllCredentials();
  const existingCredentialIds = existingCredentials.map(({ credential }) => credential.id);
  
  const pendingCredentials = credentials.map((credential) => {
    if (existingCredentialIds.includes(credential.id)) {
      return new PendingCredential(
        credential, 
        ApprovalStatus.Accepted, 
        ApprovalMessage.Duplicate,
      );
    }

    return new PendingCredential(credential);
  });

  return { pendingCredentials };
});

const credentialFoyer = createSlice({
  name: 'credentialFoyer',
  initialState,
  reducers: {
    clearFoyer(state) {
      state.pendingCredentials = initialState.pendingCredentials;
    },
    setCredentialApproval(state, action: PayloadAction<PendingCredential>) {
      const isSubject = ({ id: given }: PendingCredential) => given === action.payload.id;
      const subject = state.pendingCredentials.find(isSubject);

      if (subject === undefined) return;

      return {
        ...state,
        pendingCredentials: state.pendingCredentials.map(
          (pendingCredential) => {
            if (isSubject(pendingCredential)) {
              return {
                ...pendingCredential,
                status: action.payload.status,
              };
            } else {
              return pendingCredential;
            }
          },
        ),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(stageCredentials.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default credentialFoyer.reducer;
export const { clearFoyer, setCredentialApproval } = credentialFoyer.actions;
export { stageCredentials };
