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
            <option value={"az"}>A - Z</option>
            <option value={"za"}>Z - A</option>
          </select>
        </div>
      </div>
      <div className="filter-box">
        <h3>Filter:</h3>
        <button
          className="filter-btn"
          onClick={() => setFilterBySize((prev) => !prev)}
          style={{
            border: filterBySize
              ? "2px solid #4B9F27"
              : "2px solid rgb(31, 31, 31)",
            boxShadow: filterBySize ? "2px 2px 6px #4B9F27" : "",
          }}
        >
          {filterBySize ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-circle-o" aria-hidden="true"></i>
          )}
          Smaller than LT
        </button>
        <button
          className="filter-btn"
          onClick={() => setFilterByRegion((prev) => !prev)}
          style={{
            border: filterByRegion
              ? "2px solid #4B9F27"
              : "2px solid rgb(31, 31, 31)",
            boxShadow: filterByRegion ? "2px 2px 6px #4B9F27" : "",
          }}
        >
          {filterByRegion ? (
            <i className="fa fa-check" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-circle-o" aria-hidden="true"></i>
          )}
          In Oceania
        </button>
      </div>
    </div>
  );
};

export default Controler;
