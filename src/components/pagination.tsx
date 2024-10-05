import React, { Dispatch, SetStateAction } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalDataItems: number;
  setTotalDataItems: Dispatch<SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  totalDataItems,
}) => {
  const handlePagination = (i: number) => {
    if (i === 0) {
      setCurrentPage(i);
      setTotalPages(10);
    } else {
      let countPage = i * 10;
      setCurrentPage(countPage);
      setTotalPages(countPage + 10);
    }
  };

  const handlePrev = () => {
    if (currentPage >= 10) {
      setCurrentPage(currentPage - 10);
      setTotalPages(totalPages - 10);
    }
  };

  const handleNext = () => {
    let paginationNumbers = Math.ceil(totalDataItems);
    if (currentPage < paginationNumbers - 10) {
      setCurrentPage(currentPage + 10);
      setTotalPages(totalPages + 10);
    }
  };

  const buttons = () => {
    const buttonsArry = [];
    let paginationNumbers = Math.ceil(totalDataItems / 10);

    for (let i = 0; i < paginationNumbers; i++) {
      buttonsArry.push(
        <button
          className="btn btn-circle"
          key={i}
          onClick={() => handlePagination(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttonsArry;
  };

  return (
    <div className="pagination__items flex">
      <button className="btn btn-primary" onClick={handlePrev}>
        Prev
      </button>
      {buttons()}
      <button className="btn btn-primary" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};
