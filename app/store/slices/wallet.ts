import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, getAllRecords } from '..';
import { importWalletFrom } from '../../lib/import';
import { db, INITIAL_PROFILE_NAME } from '../../model';
import { createProfile } from './profile';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  isBiometricsEnabled: boolean,
  needsRestart: boolean;
}

type InitializeParams = {
  passphrase: string;
  enableBiometrics: boolean;
  existingWallet?: string;
}


const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  isBiometricsEnabled: false,
  needsRestart: false,
};

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
  await dispatch(getAllRecords());
  await dispatch(pollWalletState());
});

const unlockWithBiometrics = createAsyncThunk('walletState/unlockWithBiometrics', async (_, { dispatch }) => {
  await db.unlockWithBiometrics();
  await dispatch(getAllRecords());
  await dispatch(pollWalletState());
});

const initialize = createAsyncThunk('walletState/initialize', async ({ passphrase, enableBiometrics, existingWallet }: InitializeParams, { dispatch }) => {
  await db.initialize(passphrase);
  await db.unlock(passphrase);
  
  if (enableBiometrics) {
    try {
      await db.enableBiometrics();
    } catch (err) {
      console.error('Biometric auth initialization failed:', err);
    }
  }

  let reportDetails = undefined;

  if (existingWallet) {
    try {
      reportDetails = await importWalletFrom(existingWallet);
    } catch (err) {
      await db.lock().then(db.reset);
      throw err;
    }
  } else {
    await dispatch(createProfile({ profileName: INITIAL_PROFILE_NAME }));
  }

  await dispatch(getAllRecords());
  return reportDetails;
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
  toggleBiometrics
};

export const selectWalletState = (state: RootState): WalletState => state.wallet;
