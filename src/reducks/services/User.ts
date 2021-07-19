import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../network/ApiClient';
/* types */
import { TUser, TLoginUser } from '../../types/User';

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
