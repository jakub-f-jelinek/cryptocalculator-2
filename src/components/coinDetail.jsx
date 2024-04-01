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

  return (
    <div>
      <img src={data.image.large} alt={data.id} />
      <div>Název: {data.name}</div>
      <div>Cena: {data.market_data.current_price.czk}</div>
    </div>
  );
};
