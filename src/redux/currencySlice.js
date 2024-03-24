// reducers.js
import { createReducer } from "@reduxjs/toolkit";
import { setCurrency } from "./action";

const initialState = {
  currency: "czk", // Default value
};

const currencyReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCurrency, (state, action) => {
    state.currency = action.payload;
  });
});

export default currencyReducer;
