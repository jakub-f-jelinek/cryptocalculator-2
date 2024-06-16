// General
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";

// Components
import { Pagination } from "./pagination";

// Redux Toolkit
import { useFetchDataQuery } from "../redux/api";
import { addItem, deleteItem, updateTotalCalcValue } from "../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectTotal } from "../redux/selector";

// Icons
import { IoAddCircleOutline } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

interface Item {
  id: number;
  name: string;
  price: number;
  price_change_24h: number;
  current_price: number;
  market_cap_rank: number;
  image: string;
}

interface RootState {
  items: ItemType[];
}

interface ItemType {
  id: number;
  name: string;
  price: number;
  unitsTotal: number;
  amountValue: number;
  inCalculator: boolean;
}

export const List: React.FC = () => {
  const { data, error, isLoading } = useFetchDataQuery(undefined);

  const dispatch = useDispatch();
  const items = useSelector((store: RootState) => store.items);

  const totalCalcValue = useSelector(selectTotal);

  // Filters states
  const [originData, setOriginData] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filtredData, setFilteredData] = useState<Item[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalDataItems, setTotalDataItems] = useState<number>(0);

  const handleAdd = (id: number, name: string, price: number) => {
    const existingID = items.find((item) => item.id === id);

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
      setFilteredData(data);
      setOriginData(data);

      let itemsAmount = data.length / 5;

      let totalItems = data.length;
      console.log(totalItems);
      setTotalDataItems(totalItems);

      if (data.length > itemsAmount) {
        setTotalPages(data.length / 10);
      }
    }
  }, [data, items]);

  if (error) {
    return <div>Error. Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  // Fulltext search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = data.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filtered);
    setSearch(searchTerm);
    let lengthItems = filtered.length;
    setTotalDataItems(lengthItems);
  };

  // Filters Sorting items based on price
  const handleSortAsc = () => {
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

  // Reset all filter results
  const resetFilter = () => {
    setFilteredData(originData);
  };

  // Actions
  const handleDelete = (id: number) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
  };

  return (
    <section className="section-container">
      <div>
        <div className="filter-items__wrapper">
          <div className="block__input-wrapper">
            <input
              className="block__input block__input-text"
              type="text"
              placeholder="Název..."
              onChange={handleSearch}
            />
            <span className="icon__wrapper icon-inverse">
              <FaSearch />
            </span>
          </div>
          <div className="filter-items__buttons">
            <button className="btn btn-tertiary" onClick={handleSortAsc}>
              <span className="icon__wrapper icon-default">
                <FaArrowUpWideShort />
              </span>
              Seřadit od nejlevnějšího
            </button>

            <button className="btn btn-tertiary" onClick={handleSortDesc}>
              <span className="icon__wrapper icon-default">
                <FaArrowDownWideShort />
              </span>
              Seřadit od nejdražšího
            </button>

            <button className="btn btn-tertiary" onClick={resetFilter}>
              <span className="icon__wrapper icon-default">
                <RxCross1 />
              </span>
              Zrušit filtry
            </button>
          </div>
          <div>Počet výsledků: {totalDataItems}</div>
        </div>

        <ul className="list-items__wrapper">
          {filtredData.slice(currentPage, totalPages).map((coin, index) => {
            // System variables
            let priceChange =
              coin.price_change_24h < 0
                ? "price-change__lower"
                : "price-change__higher";
            let isInCalc = items.find((item) => item.id === coin.id);
            let className = `flex list-item ${isInCalc ? "in-calc" : ""}`;

            return (
              <li key={index} className={className}>
                <span>{coin.market_cap_rank}</span>
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
                    <div className="icon-default">
                      <IoAddCircleOutline />
                    </div>
                  </button>

                  <div>
                    <button
                      onClick={() => handleDelete(coin.id)}
                      className="btn btn-tertiary"
                    >
                      X
                    </button>
                  </div>

                  <Link to={`/${coin.id}`}>
                    <button className="btn btn-secondary">Detail</button>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="pagination__wrapper">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            totalDataItems={totalDataItems}
            setTotalDataItems={setTotalDataItems}
          />
        </div>
      </div>
    </section>
  );
};
