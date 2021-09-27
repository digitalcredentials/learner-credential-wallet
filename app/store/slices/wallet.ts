import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Credential } from '../../types/credential';
import { mintDid } from './did';
import { importWallet, ImportWalletParams } from '../../lib/import';
import {
  db,
  CredentialRecord,
  CredentialRecordRaw,
} from '../../model';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  rawCredentialRecords: CredentialRecordRaw[];
}

const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  rawCredentialRecords: [],
};

const getAllCredentials = createAsyncThunk('walletState/getAllCredentials', async () => ({
  rawCredentialRecords: await CredentialRecord.getAllCredentials(),
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
  await db.unlock(passphrase);
  dispatch(mintDid());
});

const reset = createAsyncThunk('walletState/reset', async () => {
  await db.lock();
  await db.reset();
});

const restore = createAsyncThunk('walletState/restore', async (params: ImportWalletParams, { dispatch }) => {
  await importWallet(params);
  await dispatch(getAllCredentials());
});

const addCredential = createAsyncThunk('walletState/addCredential', async (credential: Credential, { dispatch }) => {
  await CredentialRecord.addCredential(credential);
  await dispatch(getAllCredentials());
});

const deleteCredential = createAsyncThunk('walletState/deleteCredential', async (rawRecord: CredentialRecordRaw, { dispatch }) => {
  await CredentialRecord.deleteCredential(rawRecord);
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

    builder.addCase(unlock.rejected, (_, action) => {
      throw action.error;
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
  restore,
  pollWalletState,
  getAllCredentials,
  addCredential,
  deleteCredential,
};
