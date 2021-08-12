import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, CredentialRecord } from '../../model';
import { Credential } from '../../types/credential';

export type WalletState = {
  isUnlocked: boolean | null;
  isInitialized: boolean | null;
  credentials: Credential[];
}

const initialState: WalletState = {
  isUnlocked: null,
  isInitialized: null,
  credentials: [],
};

const fetchInitialWalletState = createAsyncThunk('walletState/fetchInitial', async () => ({
  isUnlocked: await db.isUnlocked(),
  isInitialized: await db.isInitialized(),
  credentials: await db.withInstance(instance => {
    const results = instance.objects<CredentialRecord>(CredentialRecord.name);

    if (results.length) {
      return results.map(record => record.credential);
    }

    return [];
  }),
}));

const lock = createAsyncThunk('walletState/lock', async () => {
  await db.lock();
});

const unlock = createAsyncThunk('walletState/unlock', async (passphrase: string) => {
  await db.unlock(passphrase);
});

const initialize = createAsyncThunk('walletState/initialize', async (passphrase: string) => {
  await db.initialize(passphrase);
  await db.unlock(passphrase);
});

const addCredential = createAsyncThunk('walletState/addCredential', async (credential: Credential) => {
  await db.withInstance(instance => {
    instance.write(() => {
      instance.create(CredentialRecord.name, CredentialRecord.fromRaw(credential));
    });
  });
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
  addCredential,
};
