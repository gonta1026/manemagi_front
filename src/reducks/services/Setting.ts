import { createAsyncThunk } from '@reduxjs/toolkit';

/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
/* types */
import { TSetting } from '../../types/Setting';

const { SETTINGS } = END_POINT;

// ここで認証がされているかのチェックを行っている。
export const fetchSettingAndUser = createAsyncThunk('setting/index', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SETTINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const updateSetting = createAsyncThunk(
  'setting/update',
  async (settingForm: TSetting, thunkAPI) => {
    try {
      const response: any = await ApiClient.patchRequest(
        `${SETTINGS.UPDATE}/dummy_id`,
        settingForm,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
