import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Alert = {
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
};

interface IAlertInitialState {
  alerts: Alert[];
}

const initialState: IAlertInitialState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert(state, action: PayloadAction<Alert>) {
      state.alerts.push({
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
      });
    },
  },
});

export const { createAlert } = alertSlice.actions;

export default alertSlice.reducer;
