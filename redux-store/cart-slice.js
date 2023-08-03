import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;

      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push(newItem);
        state.totalAmount = state.totalAmount + newItem.price;
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        state.totalAmount = state.totalAmount + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount = state.totalAmount - existingItem.price;
      } else {
        existingItem.quantity--;
        state.totalAmount = state.totalAmount - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
