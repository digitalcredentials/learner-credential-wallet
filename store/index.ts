import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import wallet, { WalletState } from './slices/wallet';

export interface RootState extends DefaultRootState {
  wallet: WalletState;
}

const store = configureStore({
  reducer: {
    wallet,
  },
});

export default store;
