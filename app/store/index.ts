import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';

import wallet from './slices/wallet';
import did, { _getAllDidRecords } from './slices/did';
import credentialFoyer from './slices/credentialFoyer';
import credential, { _getAllCredentialRecords } from './slices/credential';
import profile, { _getAllProfileRecords } from './slices/profile';

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

export const getAllRecords = createAsyncThunk('getAllRecords', async (_, { dispatch }) => {
  await dispatch(_getAllDidRecords());
  await dispatch(_getAllCredentialRecords());
  await dispatch(_getAllProfileRecords());
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
