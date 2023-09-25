import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Alert } from './domain/Alert';

interface IAppInitialState {
  isMobile: boolean;
  alerts: Alert[];
  userMenu: { isOpen: boolean };
}

const initialState: IAppInitialState = {
  isMobile: false,
  alerts: [],
  userMenu: { isOpen: false },
};

const appSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setIsMobile(state, { payload }: PayloadAction<boolean>) {
      state.isMobile = payload;
    },
    // ALERT
    createAlert(state, action: PayloadAction<Alert>) {
      state.alerts.push({
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    // USER MENU
    toggleArticleUserMenu(state, { payload }: { payload: boolean }) {
      const { userMenu } = state;
      userMenu.isOpen = payload;
    },
  },
});

export const { setIsMobile, createAlert, toggleArticleUserMenu } =
  appSlice.actions;

export default appSlice.reducer;
