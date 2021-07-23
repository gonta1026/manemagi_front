import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../network/ApiClient';
/* types */
import { TShoppingForm } from '../../types/Shopping';

const { SHOPPINGS } = END_POINT;

export const createShopping = createAsyncThunk(
  'shoppings/create',
  async (ShoppingForm: TShoppingForm, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(SHOPPINGS.CREATE, ShoppingForm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const fetchTShopping = createAsyncThunk('shoppings/index', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SHOPPINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
