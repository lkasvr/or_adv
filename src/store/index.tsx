import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';
import articlesSlice from './articlesSlice';

const rootReducer = combineReducers({
  app: appSlice,
  articles: articlesSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
