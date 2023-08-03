import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertSlice from './alertSlice';
import appSlice from './appSlice';

const rootReducer = combineReducers({
  app: appSlice,
  alert: alertSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
