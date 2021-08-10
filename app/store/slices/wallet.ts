import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DatabaseAccess from '../../model';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
}

const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
};

const fetchInitialWalletState = createAsyncThunk('walletState/fetchInitial', async () => ({
  isUnlocked: await DatabaseAccess.isUnlocked(),
  isInitialized: await DatabaseAccess.isInitialized(),
}));

const lock = createAsyncThunk('walletState/lock', async () => {
  await DatabaseAccess.lock();
});

const unlock = createAsyncThunk('walletState/unlock', async (passphrase: string) => {
  await DatabaseAccess.unlock(passphrase);
});

const initialize = createAsyncThunk('walletState/initialize', async (passphrase: string) => {
  await DatabaseAccess.initialize(passphrase);
  await DatabaseAccess.unlock(passphrase);
});

const walletSlice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unlock.fulfilled, (state) => (console.log('fulfilled'), {
      ...state,
      isUnlocked: true,
    }));

    builder.addCase(unlock.rejected, (state) => (console.log('rejected'), {
      ...state,
      isUnlocked: false,
    }));

    builder.addCase(lock.fulfilled, (state) => ({
      ...state,
      isUnlocked: false,
    }));

    builder.addCase(initialize.fulfilled, (state) => ({
      ...state,
      isInitialized: true,
      isUnlocked: true,
    }));

    builder.addCase(fetchInitialWalletState.fulfilled, (state, action) => ({
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
  fetchInitialWalletState,
};
