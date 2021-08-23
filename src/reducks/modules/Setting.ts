import { createSlice } from '@reduxjs/toolkit';
import { fetchSettingAndUser } from '../services/Setting';
import { commonState } from './type/common';
import { TLoadingAndErrorState } from '../../model/common';
import { settingAndUser } from '../../model/setting';

export type TTUserAndSettingAndError = settingAndUser & TLoadingAndErrorState;

export const initialState: TTUserAndSettingAndError = {
  // NOTE nullを初期値にしたいが型エラーが出るので0やカラ文字を指定
  user: {
    id: null,
    name: '',
    email: '',
    setting: {
      id: null,
      isUseLine: false,
      lineNoticeToken: '',
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
      if (action.payload.status === 'success') {
        state.user = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(fetchSettingAndUser.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = (action.payload as any).errorMessage;
    });
  },
});
