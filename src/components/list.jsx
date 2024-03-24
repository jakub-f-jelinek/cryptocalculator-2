import React from "react";
import { useFetchDataQuery } from "../redux/api";
import { addItem } from "../redux/slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "./popup";
import { CurrencySwitcher } from "./currencySwitcher";
import { Link, useParams } from "react-router-dom";

export const List = () => {
  const { data, error, isLoading } = useFetchDataQuery();
  console.log(data);

  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

  const handleAdd = (id, name, price) => {
    const existingID = items.some((items) => items.id === id);

    let defaultValue = 1;
    console.log(defaultValue);

    if (!existingID) {
      dispatch(
        addItem({
          id: id,
          name: name,
          price: price,
          value: defaultValue,
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
      <div className="popup__wrapper">
        <Popup />
      </div>

      <div className="currency-switcher__wrapper">
        <CurrencySwitcher />
      </div>

      <ul>
        {data.map((coin) => {
          return (
            <li key={coin.id} className="scss-class">
              <span>{coin.name}</span>
              <span>{coin.current_price}</span>
              <div className="btn__wrapper">
                <button
                  onClick={() =>
                    handleAdd(coin.id, coin.name, coin.current_price)
                  }
                >
                  Přidat do kalkulačky
                </button>

                <Link to={`/${coin.id}`}>
                  <button className="btn">Explore</button>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
