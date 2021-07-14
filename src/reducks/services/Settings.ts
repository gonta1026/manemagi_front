import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TSettings } from '../../types/Settings';
import { END_POINT } from '../../const/endPoint';

const { SETTINGS } = END_POINT;

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (updateSettingsForm: TSettings, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(SETTINGS.UPDATE, updateSettingsForm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
