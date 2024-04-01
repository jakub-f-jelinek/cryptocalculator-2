import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "true");
      return headers;
    },
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
