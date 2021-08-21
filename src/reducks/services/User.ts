import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
/* types */
import { TUser, TLoginUser } from '../../model/user';
// import LocalStorage from '../../modules/LocalStorage';
import Auth from '../../modules/Auth';
const auth = new Auth();

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
        // 成功
        auth.setLoginedStorage(headers['access-token'], headers['client'], headers['uid']);
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
        // 成功
        auth.setLoginedStorage(headers['access-token'], headers['client'], headers['uid']);
        return response.data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
