import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import wallet, { WalletState } from './slices/wallet';
import didKey, { DidKeyState } from './slices/didKey';

export type RootState = DefaultRootState & {
  wallet: WalletState;
  didKey: DidKeyState;
}

const store = configureStore({
  reducer: {
    wallet,
    didKey,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
