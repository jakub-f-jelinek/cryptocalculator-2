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

  const handleCount = (price) => {};

  return (
    <div>
      <div>Calculator component</div>
      <div>
        {items.map((coin) => {
          return (
            <div>
              <span>{coin.name}</span>
              <span>{coin.price}</span>
              {/* <input type="number" min="0" onChange={() => } /> */}
              <input type="number" min="0" />
              <button onClick={() => handleDelete(coin.id)}>Odstranit</button>
              <button onClick={() => this.handleCount(coin.price)}>+</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
