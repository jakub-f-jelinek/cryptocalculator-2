import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=czk
const BASE_URL = "https://api.coingecko.com/api/v3";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: (currency) => `/coins/markets?vs_currency=czk`,
    }),

    getItemID: builder.query({
      query: (id) => `/coins/${id}`,
    }),
  }),
});

export const { useFetchDataQuery, useGetItemIDQuery } = api;
