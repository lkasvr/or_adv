import { combineReducers, configureStore } from '@reduxjs/toolkit';

import appSlice from './appSlice';

const rootReducer = combineReducers({
  app: appSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
