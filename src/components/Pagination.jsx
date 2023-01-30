import React, { useContext } from "react";
import MainContext from "./MainContext";

const Pagination = () => {
  const { countriesPerPage, totalCountries, paginate } =
    useContext(MainContext);

  console.log(`countries per page: ${countriesPerPage}`);
  console.log(`total countriews: ${totalCountries}`);
  console.log(`padinate: ${paginate}`);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination-field">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
