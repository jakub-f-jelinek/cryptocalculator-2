import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
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
