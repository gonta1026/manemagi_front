import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TUser } from '../../types/User';

const { postRequest } = ApiClient;

export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (signupForm: TUser, thunkAPI) => {
    try {
      const response: any = await postRequest('/auth', signupForm);
      const { headers } = response;
      window?.localStorage.setItem('accessToken', headers['access-token']);
      window?.localStorage.setItem('client', headers['client']);
      window?.localStorage.setItem('uid', headers['uid']);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
