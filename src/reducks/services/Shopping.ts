import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
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

export const fetchShoppings = createAsyncThunk('shoppings/index', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SHOPPINGS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const fetchShopping = createAsyncThunk('shoppings/show', async (id: string, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(SHOPPINGS.SHOW(id));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const fetchEditShopping = createAsyncThunk(
  'shoppings/edit',
  async (id: string, thunkAPI) => {
    try {
      const response: any = await ApiClient.getRequest(SHOPPINGS.EDIT(id));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const updateShopping = createAsyncThunk(
  'shoppings/update',
  async ({ ShoppingForm, id }: { ShoppingForm: TShoppingForm; id: string }, thunkAPI) => {
    try {
      const response: any = await ApiClient.patchRequest(SHOPPINGS.UPDATE(id), ShoppingForm);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);

export const deleteShopping = createAsyncThunk(
  'shoppings/delete',
  async (params: { id: string; data: { isLineNotice: boolean } }, thunkAPI) => {
    const { id, data } = params;
    try {
      const response: any = await ApiClient.deleteRequest(SHOPPINGS.DESTROY(id), {
        data,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
