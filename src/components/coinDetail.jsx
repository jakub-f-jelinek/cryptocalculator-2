import React from "react";
import { useParams } from "react-router-dom";
import { useGetItemIDQuery } from "../redux/api";

export const CoinDetail = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetItemIDQuery(id);

  if (error) {
    return <div>Error. Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  console.log(data);
  console.log(data.market_data.current_price.czk);
  let price = data.market_data.current_price.czk;

  return (
    <div>
      <div>Název: {data.name}</div>
      <div>Cena: {price}</div>
    </div>
  );
};
