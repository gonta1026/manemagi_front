import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { END_POINT } from '../../const/endPoint';

const { SETTINGS } = END_POINT;

export const fetchSettingAndUser = createAsyncThunk('setting/fetchSetting', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SETTINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
