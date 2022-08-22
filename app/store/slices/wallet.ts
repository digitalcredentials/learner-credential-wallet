import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, getAllRecords } from '..';
import { db } from '../../model';
import { createProfile } from './profile';

const INITIAL_PROFILE_NAME = 'Default';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  needsRestart: boolean;
}

const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  needsRestart: false,
};

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
  dispatch(getAllRecords());
});

const initialize = createAsyncThunk('walletState/initialize', async (passphrase: string, { dispatch }) => {
  await db.initialize(passphrase);
  await db.unlock(passphrase);
  await dispatch(createProfile({ profileName: INITIAL_PROFILE_NAME }));
  dispatch(getAllRecords());
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
  },
});

export default walletSlice.reducer;
export {
  unlock,
  lock,
  initialize,
  reset,
  pollWalletState,
};

export const selectWalletState = (state: RootState): WalletState => state.wallet;
