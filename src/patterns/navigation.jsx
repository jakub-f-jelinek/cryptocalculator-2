import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectTotal } from "../redux/selector";

// Icons
import { FaCalculator } from "react-icons/fa6";

export const Navigation = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const items = useSelector((store) => store.items);
  const totalCalcValue = useSelector(selectTotal);

  useEffect(() => {
    let itemsTotal = items.length;
    setItemsCount(itemsTotal);
  }, [items]);

  return (
    <header className="header">
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
              <Link to="/calculator">
                <span>{totalCalcValue.toFixed(2)} CZK</span>
              </Link>
            </li>

            <li className="menu__item">
              <Link to="/calculator">
                <div className="menu__item-count">
                  <span>{itemsCount}</span>
                </div>
                <FaCalculator className="icon-component" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
