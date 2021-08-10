import { createSlice } from '@reduxjs/toolkit';

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

const walletSlice = createSlice({
  name: 'walletState',
  initialState,
  reducers: {
    unlock: (state: WalletState): WalletState => ({
      ...state,
      isUnlocked: true,
    }),
    lock: (state: WalletState): WalletState => ({
      ...state,
      isUnlocked: false,
    }),
  },
});

const { unlock, lock } = walletSlice.actions;

export default walletSlice.reducer;
export { unlock, lock };
