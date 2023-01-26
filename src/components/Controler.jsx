import React, { useState, useContext } from "react";
import MainContext from "./MainContext";

const Controler = () => {
  const {
    sortBy,
    setSortBy,
    filterBySize,
    filterByRegion,
    setFilterBySize,
    setFilterByRegion,
  } = useContext(MainContext);

  const az = "az";
  const za = "za";

  return (
    <div className="controler-box">
      <div className="search-box">
        <input className="search-input"></input>
        <button className="search-btn">Search</button>
      </div>
      <div className="sort-box">
        <h3>Sort:</h3>
        <div className="sort-select">
          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={az}>A - Z</option>
            <option value={za}>Z - A</option>
          </select>
        </div>
      </div>
      <div className="filter-box">
        <h3>Filter:</h3>
        <button
          className="filter-btn"
          onClick={() => setFilterBySize((prev) => !prev)}
        >
          Smaller than LT
          {filterBySize === true ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-circle-o" aria-hidden="true"></i>
          )}
        </button>
        <button
          className="filter-btn"
          onClick={() => setFilterByRegion((prev) => !prev)}
        >
          In Oceania
          {filterByRegion === true ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-circle-o" aria-hidden="true"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default Controler;
