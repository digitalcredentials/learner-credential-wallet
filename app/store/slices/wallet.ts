import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllDidRecords, mintDid } from './did';
import {
  db,
  CredentialRecord,
  CredentialRecordRaw,
} from '../../model';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  needsRestart: boolean;
  rawCredentialRecords: CredentialRecordRaw[];
}

type InitializeParams = {
  passphrase: string;
  enableBiometrics: boolean;
}


const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  needsRestart: false,
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

const unlock = createAsyncThunk('walletState/unlock', async (passphrase: string, { dispatch }) => {
  await db.unlock(passphrase);
  await dispatch(getAllDidRecords());
  await dispatch(getAllCredentials());
});

const unlockWithBiometrics = createAsyncThunk('walletState/unlockWithBiometrics', async (_, { dispatch }) => {
  await db.unlockWithBiometrics();
  await dispatch(getAllDidRecords());
  await dispatch(getAllCredentials());
});

const initialize = createAsyncThunk('walletState/initialize', async ({ passphrase, enableBiometrics }: InitializeParams, { dispatch }) => {
  await db.initialize(passphrase);
  await db.unlock(passphrase);

  if (enableBiometrics) {
    await db.enableBiometrics();
  }

  await dispatch(mintDid());
});

const reset = createAsyncThunk('walletState/reset', async () => {
  await db.lock();
  await db.reset();
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

    builder.addCase(unlockWithBiometrics.fulfilled, (state) => ({
      ...state,
      isUnlocked: true,
    }));

    builder.addCase(unlockWithBiometrics.rejected, (_, action) => {
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

    builder.addCase(reset.fulfilled, () => ({
      ...initialState,
      needsRestart: true,
    }));

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
  unlockWithBiometrics,
  lock,
  initialize,
  reset,
  pollWalletState,
  getAllCredentials,
};
