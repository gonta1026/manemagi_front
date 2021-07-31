import { combineReducers } from 'redux';
import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { postSlice, initialState as postInitialState } from './modules/Post';
import { settingSlice, initialState as settingInitialState } from './modules/Setting';

const rootReducer = combineReducers({
  postState: postSlice.reducer,
  settingState: settingSlice.reducer,
});

const preloadedState = () => {
  return { postState: postInitialState, settingState: settingInitialState };
};

// NOTE ログを本番環境には出ないようにする。
const middlewareList = [...getDefaultMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  middlewareList.push(logger);
}

const store = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default store;
