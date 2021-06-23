import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('post/fetcPosts', async (_, thunkAPI) => {
  try {
    // TODO: envなどに移す
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: error.message });
  }
});
