import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ category, sort, order, search, state }) => {
    const res = await axios.get(
      `https://644fe914b61a9f0c4d2ea16e.mockapi.io/items?page=${state.pageCount}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`
    );
    return res.data;
  }
);

const initialState = {
  items: [],
  status: 'loading',
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectorPizza = (state) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
