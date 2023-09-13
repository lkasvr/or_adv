import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticlesInitialState {
  slugsCategories: string[];
}

const initialState: IArticlesInitialState = {
  slugsCategories: [],
};

const articlesSlice = createSlice({
  name: 'articlesSlice',
  initialState,
  reducers: {
    setSlugsCategories(state, { payload }: PayloadAction<string[]>) {
      state.slugsCategories = payload;
    },
  },
});

export const { setSlugsCategories } = articlesSlice.actions;

export default articlesSlice.reducer;
