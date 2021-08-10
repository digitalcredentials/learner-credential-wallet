import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import DatabaseAccess from '../../model';

export type WalletState = {
  isUnlocked: boolean;
  isInitialized: boolean;
}

const initialState: WalletState = {
  isUnlocked: false,
  // TODO: This value will need to be pre-loaded by
  // checking the initialization state of the wallet
  // database.
  isInitialized: false,
};

const lock = createAsyncThunk('walletState/lock', () => {
  DatabaseAccess.lock();
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
  },
});

export default walletSlice.reducer;
export { unlock, lock, initialize };
