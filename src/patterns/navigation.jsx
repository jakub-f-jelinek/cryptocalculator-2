import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectTotal } from "../redux/selector";

export const Navigation = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const items = useSelector((store) => store.items);
  const amountValueTotal = useSelector(selectTotal);
  console.log(amountValueTotal);

  useEffect(() => {
    let itemsTotal = items.length;
    setItemsCount(itemsTotal);
  }, [items]);

  return (
    <div className="menu__container">
      <nav className="menu__nav">
        <ul className="menu__nav-list">
          <li className="menu__item">
            <Link to="/">Home</Link>
          </li>
          <li className="menu__item">
            <Link to="/calculator">Kalkulačka</Link>
          </li>
        </ul>
      </nav>
      <div className="menu__extras">
        <ul className="menu__extras-list">
          <li className="menu__item">
            <span>Počet položek v kalkulačce: {itemsCount}</span>
          </li>
          <li className="menu__item">
            <span>Celková hodnota: {amountValueTotal}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
