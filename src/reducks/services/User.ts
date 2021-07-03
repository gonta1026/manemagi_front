import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TUser } from '../../types/User';
import { END_POINT } from '../../const/endPoint';

const { postRequest } = ApiClient;
const { DEVISE_TOKEN_AUTH } = END_POINT;

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (signupForm: TUser, thunkAPI) => {
    try {
      const response: any = await postRequest(DEVISE_TOKEN_AUTH.REGISTRATIONS.CREATE, signupForm);
      const { headers } = response;
      localStorage.setItem('accessToken', headers['access-token']);
      localStorage.setItem('client', headers['client']);
      localStorage.setItem('uid', headers['uid']);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
