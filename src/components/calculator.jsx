import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItemAmount } from "../redux/slice";

export const Calculator = () => {
  const [amounts, setAmounts] = useState({});
  const items = useSelector((store) => store.items);
  const currency = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();

  console.log(items);

  useEffect(() => {
    console.log(amounts); // Object with IDs paired with their values
    console.log(Object.keys(amounts)); // Array with IDs
    Object.keys(amounts).forEach((id) => {
      const amountValue = amounts[id];
      console.log(amountValue);

      let currentValue = items.find((item) => item.id === id).value;
      console.log(currentValue);

      dispatch(
        updateItemAmount({
          id: id,
          value: currentValue,
          amountValue: amountValue,
        })
      );
    });
  }, [amounts, items, dispatch]);

  const handleDelete = (id) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
  };

  const handleCountChange = (id, value) => {
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: items.find((item) => item.id === id).price * value,
    }));
  };

  return (
    <div>
      <div>Calculator component</div>
      <span>{currency}</span>
      <div>
        {items.map((coin) => {
          return (
            <div id={coin.id} key={coin.id}>
              <span>{coin.name}</span>
              <span>{coin.price}</span>
              <input
                type="number"
                min="0"
                onChange={(e) => handleCountChange(coin.id, e.target.value)}
              />
              <button onClick={() => handleDelete(coin.id)}>Odstranit</button>
              <span>Množství: {amounts[coin.id]}</span>
              <span>Počet jednotek: {coin.value}</span>
              <span>Celková hodnota: {coin.amountValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
