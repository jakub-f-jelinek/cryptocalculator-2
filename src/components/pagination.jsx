import React from "react";
import { useEffect } from "react";

export const Pagination = ({ currentPage, setCurrentPage, totalPages, setTotalPages, totalDataItems, setTotalDataItems }) => {
  
  const handlePagination = (i) => {
    console.log(i)

    if (i === 0) {
      setCurrentPage(i)
      setTotalPages(10)
    } else {
      let countPage = (i + 1) * 10
      console.log(countPage)
      setCurrentPage(countPage)
      setTotalPages(countPage + 10)
    }
  }

  const buttons = () => {
    const buttonsArry = [];
    for (let i = 0; i < 10; i++) {
      buttonsArry.push(
        <button  className="btn btn-secondary" key={i} onClick={() => handlePagination(i)}>{i + 1}</button>
      )
    }
    return buttonsArry;
  }

  return (
    <div className="pagination__wrapper flex">
      <button className="btn btn-primary">Prev</button>
      {buttons()}
      <button className="btn btn-primary">Next</button>
    </div>
  );
};
