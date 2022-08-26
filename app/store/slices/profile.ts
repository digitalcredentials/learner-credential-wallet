import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRecords, RootState } from '..';
import { AddProfileRecordParams, ProfileRecord, ProfileRecordRaw } from '../../model';

export type ProfileState = {
  rawProfileRecords: ProfileRecordRaw[];
};

const initialState: ProfileState = {
  rawProfileRecords: [],
};

const _getAllProfileRecords = createAsyncThunk('profileState/_getAllProfileRecords', async () => ({
  rawProfileRecords: await ProfileRecord.getAllProfileRecords(),
}));

const createProfile = createAsyncThunk('profileState/createProfile', async (params: AddProfileRecordParams, { dispatch }) => {
  await ProfileRecord.addProfileRecord(params);
  await dispatch(_getAllProfileRecords());
});

const updateProfile = createAsyncThunk('profileState/updateProfile', async (rawProfileRecord: ProfileRecordRaw, { dispatch }) => {
  await ProfileRecord.updateProfileRecord(rawProfileRecord);
  await dispatch(_getAllProfileRecords());
});

const deleteProfile = createAsyncThunk('profileState/deleteProfile', async (rawProfileRecord: ProfileRecordRaw, { dispatch }) => {
  await ProfileRecord.deleteProfileRecord(rawProfileRecord);
  await dispatch(getAllRecords());
});

const profileSlice = createSlice({
  name: 'profileState',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(_getAllProfileRecords.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
    }));
  },
});

export default profileSlice.reducer;
export {
  _getAllProfileRecords,
  createProfile,
  deleteProfile,
  updateProfile,
};

export const selectRawProfileRecords = (state: RootState): ProfileRecordRaw[] => state.profile.rawProfileRecords;
