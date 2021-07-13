import { createSlice } from '@reduxjs/toolkit';
import { fetchSettingAndUser } from '../services/Setting';
import { commonState } from './type/common';
import { TLoadingAndErrorState } from '../../types/Common';
import { settingAndUser } from '../../types/Setting';

export type TTUserAndSettingAndError = settingAndUser & TLoadingAndErrorState;

export const initialState: TTUserAndSettingAndError = {
  user: {
    id: null,
    name: null,
    setting: {
      is_use_line: false,
      line_notice_token: null,
    },
  },
  ...commonState,
};

export const settingSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettingAndUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSettingAndUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchSettingAndUser.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = (action.payload as any).errorMessage;
    });
  },
});
