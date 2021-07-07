import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TShop } from '../../types/Shop';
import { END_POINT } from '../../const/endPoint';

const { SHOPS } = END_POINT;

export const registShop = createAsyncThunk(
  'shop/regist',
  async (shopRegistForm: TShop, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(SHOPS.CREATE, shopRegistForm);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
