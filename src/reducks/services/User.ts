import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../network/ApiClient';
/* types */
import { TUser, TLoginUser } from '../../types/User';
import LocalStorage from '../../utils/LocalStorage';

const { DEVISE_TOKEN_AUTH } = END_POINT;

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (signupForm: TUser, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(
        DEVISE_TOKEN_AUTH.REGISTRATIONS.CREATE,
        signupForm,
      );
      const { headers } = response;
      if (headers) {
        const storage = new LocalStorage();
        // 成功
        storage.setLoginedStorage(headers['access-token'], headers['client'], headers['uid']);
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (loginForm: TLoginUser, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(
        DEVISE_TOKEN_AUTH.REGISTRATIONS.NEW,
        loginForm,
      );
      const { headers, status, message } = response;
      if (status === 401) {
        // 認証エラー
        return {
          data: {
            message: message,
            status: status,
          },
        };
      } else {
        // // 成功
        const storage = new LocalStorage();
        // 成功
        storage.setLoginedStorage(headers['access-token'], headers['client'], headers['uid']);
        return response.data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
