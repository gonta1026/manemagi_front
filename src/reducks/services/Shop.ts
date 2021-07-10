import { createAsyncThunk } from '@reduxjs/toolkit';
import ApiClient from '../../network/ApiClient';
import { TShop } from '../../types/Shop';
import { END_POINT } from '../../const/endPoint';

const { SHOPS } = END_POINT;

export const registerShop = createAsyncThunk(
  'shop/register',
  async (registerShopForm: TShop, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(SHOPS.CREATE, registerShopForm);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
