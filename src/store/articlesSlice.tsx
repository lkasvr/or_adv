import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticlesInitialState {
  filters: {
    slugsCategories: string[];
    slugsSubCategories: string[];
  };
}

const initialState: IArticlesInitialState = {
  filters: {
    slugsCategories: [],
    slugsSubCategories: [],
  },
};

const articlesSlice = createSlice({
  name: 'articlesSlice',
  initialState,
  reducers: {
    setSlugsCategories(state, { payload }: PayloadAction<string[]>) {
      state.filters.slugsCategories = payload;
    },
    setSlugsSubCategories(state, { payload }: PayloadAction<string[]>) {
      state.filters.slugsSubCategories = payload;
    },
  },
});

export const { setSlugsCategories, setSlugsSubCategories } =
  articlesSlice.actions;

export default articlesSlice.reducer;
