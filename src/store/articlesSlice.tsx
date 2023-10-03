import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface IArticlesInitialState {
  searchFilters: {
    selectSubCategories: { isOpen: boolean };
    slugsSelectedCategories: string[];
    slugsSelectedSubCategories: string[];
    subCategoriesTotal: number;
    searchByTitle: string;
  };
  articles: {
    totalAmount: number;
  };
}

const initialState: IArticlesInitialState = {
  articles: {
    totalAmount: 0,
  },
  searchFilters: {
    selectSubCategories: { isOpen: false },
    slugsSelectedCategories: [],
    slugsSelectedSubCategories: [],
    subCategoriesTotal: 0,
    searchByTitle: '',
  },
};

const articlesSlice = createSlice({
  name: 'articlesSlice',
  initialState,
  reducers: {
    // SEARCH FILTERS
    setSlugsSelectedCategories(state, { payload }: PayloadAction<string[]>) {
      state.searchFilters.slugsSelectedCategories = payload;
    },
    setSlugsSelectedSubCategories(state, { payload }: PayloadAction<string[]>) {
      state.searchFilters.slugsSelectedSubCategories = payload;
    },
    setSubCategoriesTotalAmount(state, { payload }: PayloadAction<number>) {
      state.searchFilters.subCategoriesTotal = payload;
    },
    setSearchByTitle(state, { payload }: PayloadAction<string>) {
      state.searchFilters.searchByTitle = payload;
    },
    toggleSelectFilter(state, { payload }: PayloadAction<boolean>) {
      const { searchFilters } = state;
      searchFilters.selectSubCategories.isOpen = payload;
    },
    // ARTICLES
    setArticlesTotalAmount(state, { payload }: PayloadAction<number>) {
      state.articles.totalAmount = payload;
    },
  },
});

export const {
  // SEARCH FILTERS
  toggleSelectFilter,
  setSlugsSelectedCategories,
  setSlugsSelectedSubCategories,
  setSubCategoriesTotalAmount,
  setSearchByTitle,
  // ARTICLES
  setArticlesTotalAmount,
} = articlesSlice.actions;

export default articlesSlice.reducer;
