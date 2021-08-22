import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
/* types */
import { TShopForm, ResponseCreateShop, ResponseFetchShops } from '../../model/shop';

const { SHOPS } = END_POINT;

export const createShop = createAsyncThunk(
  'shops/create',
  async (ShopForm: TShopForm, thunkAPI) => {
    try {
      const response = await ApiClient.postRequest<ResponseCreateShop>(SHOPS.CREATE, ShopForm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const fetchShops = createAsyncThunk('shops/index', async (_, thunkAPI) => {
  try {
    const response = await ApiClient.getRequest<ResponseFetchShops>(SHOPS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
