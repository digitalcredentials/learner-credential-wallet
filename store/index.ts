import { configureStore } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import loginState, { LoginState } from './slices/login';

export interface RootState extends DefaultRootState {
  loginState: LoginState;
}

const store = configureStore({
  reducer: {
    loginState,
  },
});

export default store;
