import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../services/Post';

// state
export type TPost = {
  id: string | null;
  body: string | null;
  title: Date | null;
  userId: Date | null;
};

export type TPostState = {
  post: TPost | null;
  posts: Array<TPost> | null;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const initialState: TPostState = {
  post: null,
  posts: [],
  loading: false,
  error: false,
  errorMessage: '',
};

// createSlice(action, reducer)
export const postSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.post = action.payload[0];
      state.posts = action.payload;
      state.loading = false;
      state.error = false;
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
