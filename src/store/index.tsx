import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertSlice from './alertSlice';

const rootReducer = combineReducers({
  alert: alertSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
