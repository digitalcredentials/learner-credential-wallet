import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllDidRecords, mintDid } from './did';
import {
  db,
  CredentialRecord,
  CredentialRecordRaw,
} from '../../model';
import { RootState } from '..';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  isBiometricsEnabled: boolean,
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
  isBiometricsEnabled: false,
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
    isBiometricsEnabled: await db.isBiometricsEnabled(),
  };
});

const lock = createAsyncThunk('walletState/lock', async (_, { dispatch }) => {
  await db.lock();
  await dispatch(pollWalletState());
});

const unlock = createAsyncThunk('walletState/unlock', async (passphrase: string, { dispatch }) => {
  await db.unlock(passphrase);
  await dispatch(getAllDidRecords());
  await dispatch(getAllCredentials());
  await dispatch(pollWalletState());
});

const unlockWithBiometrics = createAsyncThunk('walletState/unlockWithBiometrics', async (_, { dispatch }) => {
  await db.unlockWithBiometrics();
  await dispatch(getAllDidRecords());
  await dispatch(getAllCredentials());
  await dispatch(pollWalletState());
});

const initialize = createAsyncThunk('walletState/initialize', async ({ passphrase, enableBiometrics }: InitializeParams, { dispatch }) => {
  await db.initialize(passphrase);
  await db.unlock(passphrase);
  await dispatch(mintDid());
  
  if (enableBiometrics) {
    try {
      await db.enableBiometrics();
    } catch (err) {
      console.error('Biometric auth initialization failed:', err);
    }
  }

  await dispatch(pollWalletState());
});


const reset = createAsyncThunk('walletState/reset', async () => {
  await db.lock();
  await db.reset();
});

const toggleBiometrics = createAsyncThunk('walletState/toggleBiometrics', async (_, { getState, dispatch }) => {
  const state = await getState() as RootState;
  const { isBiometricsEnabled } = state.wallet;
  
  if (isBiometricsEnabled) {
    await db.disableBiometrics();
  } else {
    await db.enableBiometrics();
  }

  await dispatch(pollWalletState());
});

const walletSlice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unlock.rejected, (_, action) => {
      throw action.error;
    });

    builder.addCase(unlockWithBiometrics.rejected, (_, action) => {
      throw action.error;
    });

    builder.addCase(toggleBiometrics.rejected, (_, action) => {
      throw action.error;
    });

    builder.addCase(initialize.rejected, (_, action) => {
      throw action.error;
    });

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
  toggleBiometrics
};
