import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TUser, TLoginUser } from '../../types/User';
import { END_POINT } from '../../const/endPoint';

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
      localStorage.setItem('accessToken', headers['access-token']);
      localStorage.setItem('client', headers['client']);
      localStorage.setItem('uid', headers['uid']);
      return response.data;
    } catch (error) {
      console.log(error);
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
      console.log({ response });
      const { headers, status, message } = response;
      if (status === 401) {
        return {
          data: {
            message: message,
            status: status,
          },
        };
      } else {
        localStorage.setItem('accessToken', headers['access-token']);
        localStorage.setItem('client', headers['client']);
        localStorage.setItem('uid', headers['uid']);
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
