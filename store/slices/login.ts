import { createSlice } from '@reduxjs/toolkit';

export type LoginState = {
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'loginState',
  initialState,
  reducers: {
    login: () => ({ isLoggedIn: true }),
    logout: () => ({ isLoggedIn: true }),
  },
});

const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
export { login, logout };
