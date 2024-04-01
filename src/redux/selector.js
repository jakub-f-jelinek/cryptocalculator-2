import { createSelector } from "@reduxjs/toolkit";

// Selekce všech položek z Redux store
const selectItems = (state) => state.items;

// Selektor pro sečtení číselných hodnot
export const selectTotal = createSelector(selectItems, (items) =>
  items.reduce((total, item) => total + item.amountValue, 0)
);
