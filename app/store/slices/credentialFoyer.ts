import uuid from 'react-native-uuid';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {canonicalize as jcsCanonicalize} from 'json-canonicalize';

import { CredentialRecord } from '../../model';
import type { Credential } from '../../types/credential';
import { RootState } from '..';

export enum ApprovalStatus {
  Pending,
  PendingDuplicate,
  Accepted,
  Rejected,
  Errored,
}

export enum ApprovalMessage {
  Pending = 'None',
  Accepted = 'Added to Wallet',
  Rejected = 'Credential Declined',
  Errored = 'Credential Failed to Add',
  Duplicate = 'This credential is already in your wallet.'
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

function comparableStringFor(credential: Credential): string {
  const rawCredential = { ...credential } as Record<string, unknown>;

  delete rawCredential.issuanceDate;
  delete rawCredential.proof;

  return JSON.stringify(jcsCanonicalize(rawCredential));
}

const stageCredentials = createAsyncThunk('credentialFoyer/stageCredentials', async (credentials: Credential[]) => {
  const existingCredentialRecords = await CredentialRecord.getAllCredentialRecords();
  const existingCredentialStrings = existingCredentialRecords.map(({ credential }) => comparableStringFor(credential));

  const pendingCredentials = credentials.map((credential) => {
    const isDuplicate = existingCredentialStrings.includes(comparableStringFor(credential));

    if (isDuplicate) {
      return new PendingCredential(credential, ApprovalStatus.PendingDuplicate);
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

export const selectPendingCredentials = (state: RootState): PendingCredential[] => state.credentialFoyer.pendingCredentials;
