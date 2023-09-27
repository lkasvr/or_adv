import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    createAlert(
      state,
      action: PayloadAction<Omit<Omit<Alert, 'id'>, 'status'>>,
    ) {
      state.alerts.push({
        id: uuidv4(),
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        status: 'display',
        duration: action.payload.duration ?? 5000,
      });
    },
    setDisplayedAlert(state, { payload }: { payload: string }) {
      state.alerts.forEach((alert) => {
        if (alert.id === payload) alert.status = 'displayed';
      });
    },
    // USER MENU
    toggleArticleUserMenu(state, { payload }: { payload: boolean }) {
      const { userMenu } = state;
      userMenu.isOpen = payload;
    },
  },
});

export const {
  setIsMobile,
  createAlert,
  setDisplayedAlert,
  toggleArticleUserMenu,
} = appSlice.actions;

export default appSlice.reducer;
