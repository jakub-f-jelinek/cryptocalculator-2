import React, { useState, useEffect } from "react";
import { useFetchDataQuery } from "../redux/api";
import { addItem, updateItem, updateTotalCalcValue } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { Popup } from "./popup";
import { CurrencySwitcher } from "./currencySwitcher";
import { Link, useParams } from "react-router-dom";
import { selectTotal } from "../redux/selector";

import { IoAddCircleOutline } from "react-icons/io5";

export const List = () => {
  const { data, error, isLoading } = useFetchDataQuery();

  const dispatch = useDispatch();
  const items = useSelector((store) => store.items);

  const totalCalcValue = useSelector(selectTotal);
  const [totalCalc, setTotalCount] = useState(0);

  // Filters states
  const [search, setSearch] = useState("");
  const [filtredData, setFilteredData] = useState([]);
  const [amountSearchResult, setAmountSearchResult] = useState(0);
  const [sortedItems, setSortedItems] = useState([]);

  const handleAdd = (id, name, price) => {
    const existingID = items.find((items) => items.id === id);

    if (!existingID) {
      dispatch(
        addItem({
          id: id,
          name: name,
          price: price,
          unitsTotal: 1,
          amountValue: price,
          inCalculator: true,
        })
      );

      let updatedTotalCalc = totalCalcValue + price;
      dispatch(updateTotalCalcValue(updatedTotalCalc));
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setFilteredData(data);
    }
  }, [data]);

  if (error) {
    return <div>Error. Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  /// Filter

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setSearch(searchTerm);
  };

  const handleSortAsc = () => {
    //sortedItems
    console.log(sortedItems);
    const sortedData = [...filtredData].sort(
      (a, b) => a.current_price - b.current_price
    );
    setFilteredData(sortedData);
  };

  const handleSortDesc = () => {
    const sortedData = [...filtredData].sort(
      (a, b) => b.current_price - a.current_price
    );
    setFilteredData(sortedData);
  };

  const nextPagination = () => {
    const dataLength = data.length / 10;
    console.log(dataLength);
  };

  return (
    <section className="section-container">
      <div>
        <div className="filter-items__wrapper">
          <input type="text" onChange={handleSearch} />
          <span>Počet výsledků: {amountSearchResult}</span>
          <button className="btn btn-primary" onClick={handleSortAsc}>
            Seřadit od nejlevnějšího
          </button>

          <button className="btn btn-primary" onClick={handleSortDesc}>
            Seřadit od nejdražšího
          </button>
        </div>

        <ul className="list-items__wrapper">
          {filtredData.map((coin) => {
            let priceChange =
              coin.price_change_24h < 0
                ? "price-change__lower"
                : "price-change__higher";

            return (
              <li key={coin.id} className="flex list-item">
                <div className="list-item__info">
                  <img
                    className="list-item__img"
                    src={coin.image}
                    alt={coin.image}
                  />
                  <span>{coin.name}</span>
                  <span className="list-item__info-price">
                    {coin.current_price}
                    <span>CZK</span>
                  </span>
                  <span className={priceChange}>{coin.price_change_24h}</span>
                </div>

                <div className="btn__wrapper">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleAdd(coin.id, coin.name, coin.current_price)
                    }
                  >
                    Přidat do kalkulačky
                    <div className="icon-wrapper">
                      <IoAddCircleOutline />
                    </div>
                  </button>

                  <Link to={`/${coin.id}`}>
                    <button className="btn btn-secondary">Detail</button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
