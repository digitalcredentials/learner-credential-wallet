import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import wallet, { WalletState } from './slices/wallet';

export type RootState = DefaultRootState & {
  wallet: WalletState;
}

const store = configureStore({
  reducer: {
    wallet,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
