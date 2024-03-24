import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    deleteItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        return state.filter((item) => item.id !== id);
      }
    },
    updateItemAmount: (state, action) => {
      const { id, value, amountValue } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.id = id;
        existingItem.value = value;
        existingItem.amountValue = amountValue;
      }
    },
  },
});

export const { addItem, deleteItem, updateItemAmount } = itemSlice.actions;
export default itemSlice.reducer;
