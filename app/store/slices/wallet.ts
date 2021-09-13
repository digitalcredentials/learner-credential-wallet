import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { db } from '../../model';
import { Credential } from '../../types/credential';
import CredentialDAO, { CredentialObject } from '../../model/dao/Credential';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  credentialObjects: CredentialObject[];
}

const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  credentialObjects: [],
};

const getAllCredentials = createAsyncThunk('walletState/getAllCredentials', async () => ({
  credentialObjects: await CredentialDAO.getAllCredentials(),
}));

const pollWalletState = createAsyncThunk('walletState/pollState', async () => {
  return {
    isUnlocked: await db.isUnlocked(),
    isInitialized: await db.isInitialized(),
  };
});

const lock = createAsyncThunk('walletState/lock', async () => {
  await db.lock();
});

const unlock = createAsyncThunk('walletState/unlock', async (passphrase: string) => {
  await db.unlock(passphrase);
});

const initialize = createAsyncThunk('walletState/initialize', async (passphrase: string, { dispatch }) => {
  await db.initialize(passphrase);
  await dispatch(unlock(passphrase));
});

const reset = createAsyncThunk('walletState/reset', async () => {
  await db.lock();
  await db.reset();
});

const addCredential = createAsyncThunk('walletState/addCredential', async (credential: Credential, { dispatch }) => {
  await CredentialDAO.addCredential(credential);
  await dispatch(getAllCredentials());
});

const deleteCredential = createAsyncThunk('walletState/deleteCredential', async (credentialObject: CredentialObject, { dispatch }) => {
  await CredentialDAO.deleteCredential(credentialObject);
  await dispatch(getAllCredentials());
});

const walletSlice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unlock.fulfilled, (state) => ({
      ...state,
      isUnlocked: true,
    }));

    builder.addCase(unlock.rejected, (state, action) => {
      throw action.error
    });

    builder.addCase(lock.fulfilled, (state) => ({
      ...state,
      isUnlocked: false,
    }));

    builder.addCase(initialize.fulfilled, (state) => ({
      ...state,
      isInitialized: true,
      isUnlocked: true,
    }));

    builder.addCase(reset.fulfilled, () => initialState);

    builder.addCase(pollWalletState.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));

    builder.addCase(getAllCredentials.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default walletSlice.reducer;
export {
  unlock,
  lock,
  initialize,
  reset,
  pollWalletState,
  getAllCredentials,
  addCredential,
  deleteCredential,
};
