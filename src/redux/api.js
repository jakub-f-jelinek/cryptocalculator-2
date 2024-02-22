import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
  }),
  endpoints: (builder) => ({
    fetchData: builder.query({
      query: () => "data",
    }),
  }),
});

export const { useFetchDataQuery } = api;
