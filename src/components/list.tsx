// General
import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import classNames from "classNames";

// Components
import { Pagination } from "./pagination";
import { Button } from "../partials/button";
import { Calculator } from "./calculator";

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
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

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

  // Actions
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

      let itemsAmount = 10;

      let totalItems = data.length;
      setTotalDataItems(totalItems);

      if (data.length > itemsAmount) {
        setTotalPages(data.length / 10);
      }

      console.log(items);
    }
  }, [data, items]);

  useEffect(() => {
    console.log(search);
    if (search === "") {
      setCurrentPage(0);
      setTotalPages(10);
    }
  }, [search]);

  const handleDelete = (id: number) => {
    dispatch(
      deleteItem({
        id: id,
      })
    );
  };

  // Fulltext search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = data.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setSearch(searchTerm);
    setFilteredData(filtered);
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
    setCurrentPage(0);
    setTotalPages(10);

    setSearch("");
    setTotalDataItems(100);
  };

  // Classnames function
  const getItemClassList = (isInCalc: boolean) => {
    return classNames("flex list-item", {
      "in-calc": isInCalc,
    });
  };

  const getPriceChangeClass = (priceChange24h: number) => {
    return priceChange24h < 0 ? "price-change__lower" : "price-change__higher";
  };

  // RTK Query loading
  if (error) {
    return <div>Error. Something went wrong...</div>;
  }

  if (isLoading) {
    return <div>Data loading...</div>;
  }

  return (
    <section className="section-container flex">
      <div className="w-60 block">
        <div className="filter-items__wrapper flex column w-100">
          <div className="block__input-wrapper flex w-100">
            <input
              className="block__input block__input-text w-100"
              type="text"
              placeholder="Název..."
              value={search}
              onChange={handleSearch}
            />
            <span className="icon__wrapper icon-inverse">
              <FaSearch />
            </span>
          </div>

          <div className="filter-items__buttons flex w-100">
            <Button
              className="btn-secondary"
              text="Od nejlevnějšího"
              icon={<FaArrowUpWideShort />}
              onClick={handleSortAsc}
            />
            <Button
              className="btn-tertiary"
              text="Od nejdražšího"
              icon={<FaArrowDownWideShort />}
              onClick={handleSortDesc}
            />
            <Button
              className="btn-tertiary"
              text="Zrušit filtry"
              icon={<RxCross1 />}
              onClick={resetFilter}
            />

            <div>Počet výsledků: {totalDataItems}</div>
          </div>
        </div>

        <ul className="list-items__wrapper">
          {filtredData.slice(currentPage, totalPages).map((coin, index) => {
            // Variables
            const isInCalc = items.some((item) => item.id === coin.id);
            const listItemClassName = getItemClassList(isInCalc);
            const priceChangeClassName = getPriceChangeClass(
              coin.price_change_24h
            );

            return (
              <li key={index} id={coin.name} className={listItemClassName}>
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
                  <span className={priceChangeClassName}>
                    {coin.price_change_24h.toFixed(4)}
                  </span>
                </div>

                <div className="btn__wrapper">
                  <Button
                    className="btn btn-secondary"
                    icon={<IoAddCircleOutline />}
                    onClick={() =>
                      handleAdd(coin.id, coin.name, coin.current_price)
                    }
                  />

                  <Button
                    className="btn btn-secondary"
                    icon={<MdDeleteForever />}
                    onClick={() => handleDelete(coin.id)}
                  />

                  <Link to={`/${coin.id}`}>
                    <Button
                      className="btn btn-secondary"
                      icon={<FaRegArrowAltCircleRight />}
                    />
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
      <div className="w-40 block">
        <div className="card-wrapper"></div>

        <div className="card-wrapper">
          <Calculator />
        </div>
      </div>
    </section>
  );
};
