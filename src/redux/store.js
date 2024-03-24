import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api.js";
import itemsReducer from "./slice.js";
import currencyReducer from "./currencySlice.js";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    currency: currencyReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
