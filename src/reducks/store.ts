import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { postSlice, initialState as postInitialState } from './modules/Post';

const rootReducer = combineReducers({
  postState: postSlice.reducer,
});

const preloadedState = () => {
  return { postState: postInitialState };
};

const store = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];
  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default store;
