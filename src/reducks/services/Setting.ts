import { createAsyncThunk } from '@reduxjs/toolkit';

/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
/* types */
import { TSettingFormik, ResponseFetchSetting } from '../../model/setting';

const { SETTINGS } = END_POINT;

// ここで認証がされているかのチェックを行っている。
export const fetchSettingAndUser = createAsyncThunk('setting/index', async (_, thunkAPI) => {
  try {
    const response = await ApiClient.getRequest<ResponseFetchSetting>(SETTINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(ApiClient._normalizeError(error));
  }
});

export const updateSetting = createAsyncThunk(
  'setting/update',
  async (settingForm: TSettingFormik, thunkAPI) => {
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
