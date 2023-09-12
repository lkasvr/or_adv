import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppInitialState {
  isMobile: boolean;
  userMenu: { isOpen: boolean };
}

const initialState: IAppInitialState = {
  isMobile: false,
  userMenu: { isOpen: false },
};

const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setIsMobile(state, { payload }: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
    toggleArticleUserMenu(state, { payload }) {
      const { userMenu } = state;
      userMenu.isOpen = payload;
    },
  },
});

export const { setIsMobile, toggleArticleUserMenu } = appSlice.actions;

export default appSlice.reducer;
