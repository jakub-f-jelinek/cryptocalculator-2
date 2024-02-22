import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem } from "../redux/slice";

export const Calculator = () => {
  const [amount, setAmount] = useState();
  const items = useSelector((store) => store.items);
  console.log(items);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
  };

  const handleCount = (price) => {
    
  }

  return (
    <div>
      <div>calculator</div>
      <div>
        {items.map((coin) => {
          return (
            <div>
              <span>{coin.name}</span>
              <span>{coin.price}</span>
              <button onClick={() => handleDelete(coin.id)}>Odstranit</button>
              <button onClick={() => handleCount(coin.price)}>+</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
