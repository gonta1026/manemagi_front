import { createAsyncThunk } from '@reduxjs/toolkit';
/* const */
import { END_POINT } from '../../const/endPoint';
/* network */
import ApiClient from '../../modules/ApiClient';
/* types */
import { TClaimForm } from '../../types/Claim';

const { CLAIMS } = END_POINT;

export const fetchClaims = createAsyncThunk('claims/index', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(CLAIMS.INDEX);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const fetchNoClaimShoppings = createAsyncThunk('claims/new', async (_, thunkAPI) => {
  try {
    const response: any = await ApiClient.getRequest(CLAIMS.NEW);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});

export const createClaim = createAsyncThunk(
  'shoppings/create',
  async (shoppingIds: TClaimForm, thunkAPI) => {
    try {
      const response: any = await ApiClient.postRequest(CLAIMS.CREATE, shoppingIds);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: error.message });
    }
  },
);
