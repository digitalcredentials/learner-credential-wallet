import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';

import wallet, { WalletState } from './slices/wallet';
import did, { DidState, _getAllDidRecords } from './slices/did';
import credentialFoyer, { CredentialFoyerState } from './slices/credentialFoyer';
import credential, { CredentialState, _getAllCredentialRecords } from './slices/credential';
import profile, { _getAllProfileRecords, ProfileState } from './slices/profile';

export type RootState = DefaultRootState & {
  wallet: WalletState;
  did: DidState;
  credentialFoyer: CredentialFoyerState;
  credential: CredentialState,
  profile: ProfileState,
}

const store = configureStore({
  reducer: {
    wallet,
    did,
    credentialFoyer,
    credential,
    profile
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch

export const getAllRecords = createAsyncThunk('getAllRecords', async (_, { dispatch }) => {
  await dispatch(_getAllDidRecords());
  await dispatch(_getAllCredentialRecords());
  await dispatch(_getAllProfileRecords());
});

export default store;
