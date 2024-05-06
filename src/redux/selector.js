import { createSelector } from "@reduxjs/toolkit";

// Select "items" fromm Redux store
const selectItems = (state) => state.items;

// Sum up items prices in calculator
export const selectTotal = createSelector(selectItems, (items) =>
  items.reduce((total, item) => total + item.amountValue, 0)
);
