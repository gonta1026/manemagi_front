import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../services/Post';
import { commonState } from './type/common';
import { TLoadingAndErrorState } from '../../model/common';
import { TPostState } from '../../model/post';

export type TPostAndLoadingAndError = TPostState & TLoadingAndErrorState;

export const initialState: TPostAndLoadingAndError = {
  post: null,
  posts: [],
  ...commonState,
};

export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.post = action.payload[0];
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = (action.payload as any).errorMessage;
    });
  },
});
