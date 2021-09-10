import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { DidKey } from '../../types/didKey';
import { DidKeyRecord, DidKeyRecordRaw } from '../../model';

export type DidKeyState = {
  rawDidKeyRecords: DidKeyRecordRaw[];
};

const initialState: DidKeyState = {
  rawDidKeyRecords: [],
};

const getAllDidKeys = createAsyncThunk('didKeyState/getAllDidKeys', async () => ({
  rawDidKeyRecords: await DidKeyRecord.getAllDidKeys(),
}));

const addDidKey = createAsyncThunk('walletState/addDidKey', async (didKey: DidKey, { dispatch }) => {
  await DidKeyRecord.addDidKey(didKey);
  await dispatch(getAllDidKeys());
});

const deleteDidKey = createAsyncThunk('walletState/deleteDidKey', async (rawRecord: DidKeyRecordRaw, { dispatch }) => {
  await DidKeyRecord.deleteDidKey(rawRecord);
  await dispatch(getAllDidKeys());
});

const didKeySlice = createSlice({
  name: 'didKeyState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDidKeys.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default didKeySlice.reducer;
export {
  getAllDidKeys,
  addDidKey,
  deleteDidKey,
};
