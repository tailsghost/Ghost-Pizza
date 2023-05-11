import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortName(state, action) {
      state.sort = { ...action.payload };
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFiltres(state, action) {
      state.pageCount = Number(action.payload.pageCount);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const selectorFilter = (state) => state.filterSlice;

export const {
  setCategoryId,
  setSortName,
  setPageCount,
  setFiltres,
  setClearFilter,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
