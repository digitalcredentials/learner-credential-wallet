import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import wallet, { WalletState } from './slices/wallet';
import did, { DidState } from './slices/did';

export type RootState = DefaultRootState & {
  wallet: WalletState;
  did: DidState;
}

const store = configureStore({
  reducer: {
    wallet,
    did,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
