import { configureStore } from "@reduxjs/toolkit";
import { api } from './api.js';
// import slice from "./slice.js";
import itemsReducer from "./slice.js"

export const store = configureStore({
    reducer: {
        items: itemsReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})