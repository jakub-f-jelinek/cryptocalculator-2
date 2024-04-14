import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItem, updateTotalCalcValue } from "../redux/slice";
import { selectTotal } from "../redux/selector";

export const Calculator = () => {
  const [amounts, setAmounts] = useState({});
  const [totalValueState, setTotalValueState] = useState(0);
  const [currentTotalCalcValue, setCurrentTotalCalcValue] = useState(0);
  const items = useSelector((store) => store.items);
  const currency = useSelector((state) => state.currency.currency);
  const dispatch = useDispatch();
  const totalCalcValue = useSelector(selectTotal);

  const handleCountChange = (id, value) => {
    const unitsAmount = parseFloat(value);
    const price = items.find((item) => item.id === id).price;
    const amountValue = price * unitsAmount;

    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [id]: amountValue,
    }));

    dispatch(
      updateItem({
        id: id,
        unitsTotal: unitsAmount,
        amountValue: amountValue,
      })
    );
  };

  const handleDelete = (id, price) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );

    if (price && price !== undefined) {
      const updatedTotalCalc = totalCalcValue - price;
      dispatch(updateTotalCalcValue(updatedTotalCalc));
    }
  };

  useEffect(() => {
    dispatch(updateTotalCalcValue(totalCalcValue));
  }, [totalCalcValue, dispatch]);

  return (
    <div>
      <div>Calculator component</div>
      <span>{currency}</span>
      <div>
        {items.map((coin) => (
          <div key={coin.id}>
            <span>{coin.name}</span>
            <span>{coin.price}</span>
            <input
              value={coin.unitsTotal}
              type="number"
              min="0"
              onChange={(e) => handleCountChange(coin.id, e.target.value)}
            />
            <button onClick={() => handleDelete(coin.id, coin.price)}>
              Odstranit
            </button>
            <span>Celková hodnota: {coin.amountValue}</span>
            <span>Počet jednotek: {coin.unitsTotal}</span>
            <span>Hodnota kalkulačky: {coin.totalCalcValue}</span>
            <span>||| Procenta: {coin.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
