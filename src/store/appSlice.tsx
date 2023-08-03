import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppInitialState {
  isMobile: boolean;
}

const initialState: IAppInitialState = {
  isMobile: false,
};

const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setIsMobile(state, { payload }: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
  },
});

export const { setIsMobile } = appSlice.actions;

export default appSlice.reducer;
