import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAppInitialState {
  isMobile: boolean;
  userMenu: { isOpen: boolean };
  searchFilters: { isSelectOpen: boolean };
}

const initialState: IAppInitialState = {
  isMobile: false,
  userMenu: { isOpen: false },
  searchFilters: {
    isSelectOpen: false,
  },
};

const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setIsMobile(state, { payload }: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
    // USER MENU
    toggleArticleUserMenu(state, { payload }) {
      const { userMenu } = state;
      userMenu.isOpen = payload;
    },
    // SEARCH FILTERS
    toggleSelectFilter(state, { payload }) {
      const { searchFilters } = state;
      searchFilters.isSelectOpen = payload;
    },
  },
});

export const { setIsMobile, toggleArticleUserMenu, toggleSelectFilter } =
  appSlice.actions;

export default appSlice.reducer;
