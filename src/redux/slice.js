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
    updateItem: (state, action) => {
      const { id, unitsTotal, amountValue } =
        action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.id = id;
        existingItem.unitsTotal = unitsTotal;
        existingItem.amountValue = amountValue;
      }
    },
    updateTotalCalcValue: (state, action) => {
      const newTotalCalcValue = action.payload;
      state.forEach((item) => {
        item.totalCalcValue = newTotalCalcValue;
        const percentage = (item.amountValue / newTotalCalcValue) * 100;
        item.percent = +percentage.toFixed(2);
      });
    },
  },
});

export const { addItem, deleteItem, updateItem, updateTotalCalcValue } =
  itemSlice.actions;
export default itemSlice.reducer;
