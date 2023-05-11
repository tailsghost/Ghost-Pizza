import { createSlice } from '@reduxjs/toolkit';
import totalPrice from '../../utils/calcTotalPrice';

export const jsonData = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  totalPrice: totalPrice(),
  items: jsonData,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter(
        (obj) =>
          obj.size !== action.payload.size ||
          obj.type !== action.payload.type ||
          obj.id !== action.payload.id
      );

      console.log(action.payload);
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }
      if (findItem.count === 0) {
        state.items = state.items.filter((obj) => obj.count !== findItem.count);
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const selectCart = (state) => state.cartSlice;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
