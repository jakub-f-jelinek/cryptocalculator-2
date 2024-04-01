import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItemAmount } from "../redux/slice";

export const Calculator = () => {
  const [amounts, setAmounts] = useState({});
  const [unitValue, setUnitValue] = useState({});
  const items = useSelector((store) => store.items);
  const currency = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();

  const handleCountChange = (id, value) => {
    const parsedValue = parseFloat(value);
    const price = items.find((item) => item.id === id).price;

    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: price * parsedValue,
    }));

    dispatch(
      updateItemAmount({
        id: id,
        unitsTotal: parsedValue,
        amountValue: price * parsedValue,
      })
    );
  };

  const handleDelete = (id) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
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
              <span>Celková hodnota: {coin.amountValue}</span>
              <span>Počet jednotek: {coin.unitsTotal}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
