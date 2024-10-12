import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api.js";
import itemsReducer from "./slice.js";
import currencyReducer from "./currencySlice.js";

export const store = configureStore({
  reducer: {
    // from slice.js
    items: itemsReducer,

    // from currencySlice.js
    currency: currencyReducer,

    // from api.js
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
