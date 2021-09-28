import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import wallet, { WalletState } from './slices/wallet';
import did, { DidState } from './slices/did';
import credentialFoyer, { CredentialFoyerState } from './slices/credentialFoyer';

export type RootState = DefaultRootState & {
  wallet: WalletState;
  did: DidState;
  credentialFoyer: CredentialFoyerState;
}

const store = configureStore({
  reducer: {
    wallet,
    did,
    credentialFoyer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
