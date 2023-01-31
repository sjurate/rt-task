import React, { useContext } from "react";
import MainContext from "./MainContext";

const Pagination = () => {
  const {
    countriesPerPage,
    totalCountries,
    paginate,
    currentPage,
    setCurrentPage,
  } = useContext(MainContext);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  const goForwardPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const goBackPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <nav className="pagination-box">
      <ul className="pagination-list">
        <li
          className="page-item"
          style={{
            display: currentPage === 1 ? "none" : "block",
          }}
        >
          <button className="page-btn" onClick={goBackPage}>
            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => paginate(number)}
              className="page-btn"
              style={{
                color: currentPage == number ? "#058905" : "rgb(31, 31, 31)",
                fontSize: currentPage == number ? "1rem" : "0.9rem",
              }}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className="page-item"
          style={{
            display: currentPage === pageNumbers.length ? "none" : "block",
          }}
        >
          <button className="page-btn" onClick={goForwardPage}>
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
