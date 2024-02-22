import React from "react";
import { useFetchDataQuery } from "../redux/api";
import { addItem } from "../redux/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const List = () => {
  const { data, error, isLoading } = useFetchDataQuery();

  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

  const handleAdd = (id, name, price) => {
    const existingID = items.some((items) => items.id === id);
    console.log(existingID);

    if (!existingID) {
      dispatch(
        addItem({
          id: id,
          name: name,
          price: price,
        })
      );
    }
  };

  if (error) {
    return <div>Error. Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  return (
    <div>
      <ul>
        {data.map((coin) => {
          return (
            <li key={coin.id}>
              <span>{coin.name}</span>
              <span>{coin.current_price}</span>
              <button
                onClick={() =>
                  handleAdd(coin.id, coin.name, coin.current_price)
                }
              >
                Přidat do kalkulačky
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
