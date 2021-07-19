import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../network/ApiClient';
/* types */
import { TShopForm } from '../../types/Shop';

const { SHOPS } = END_POINT;

export const createShop = createAsyncThunk(
  'shops/create',
  async (ShopForm: TShopForm, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(SHOPS.CREATE, ShopForm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const fetchShops = createAsyncThunk('shops/index', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SHOPS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
