import React, { useState, useEffect } from "react";
import MainContext from "./MainContext";
import Header from "./Header";
import Controler from "./Controler";
import List from "./List";

const Main = () => {
  const [countries, setCountries] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [filterBySize, setFilterBySize] = useState(false);
  const [filterByRegion, setFilterByRegion] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  // fetching countries for list
  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.map((d, i) => ({ ...d, show: true, row: i })));
      })
      .catch((_) => setCountries("ERROR"));
  }, [setCountries]);

  // getting number of pages
  useEffect(() => {
    let count = 0;
    countries?.map((c) => (c.show ? count++ : count));
    setNumPages((prev) => Math.ceil(count / 20));
  }, [countries]);

  // paginating
  useEffect(() => {
    setCountries((prevCountries) =>
      prevCountries?.map((c, i) => {
        if (c.row < currPage * 20) {
          return { ...c, show: true };
        } else {
          return { ...c, show: false };
        }
      })
    );
  }, [currPage]);

  // filtering functionality
  useEffect(() => {
    if (filterBySize && filterByRegion) {
      setCountries((prev) =>
        prev.map((country) =>
          Number(country.area) < 65300 && country.region === "Oceania"
            ? { ...country, show: true }
            : { ...country, show: false }
        )
      );
    } else if (filterBySize) {
      setCountries((prev) =>
        prev.map((country) =>
          Number(country.area) < 65300
            ? { ...country, show: true }
            : { ...country, show: false }
        )
      );
    } else if (filterByRegion) {
      setCountries((prev) =>
        prev.map((country) =>
          country.region === "Oceania"
            ? { ...country, show: true }
            : { ...country, show: false }
        )
      );
    } else {
      setCountries((prev) =>
        prev?.map((country) => ({ ...country, show: true }))
      );
    }
  }, [filterBySize, filterByRegion]);

  // sorting functionality
  useEffect(() => {
    switch (sortBy) {
      case "az":
        setCountries((c) =>
          [...c]?.sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case "za":
        setCountries((c) =>
          [...c]?.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name < b.name) {
              return 1;
            }
            return 0;
          })
        );
        break;
      default:
        setCountries((c) => [...(c ?? [])]?.sort((a, b) => a.name - b.name));
    }
  }, [sortBy, setCountries]);

  return (
    <div className="main-page">
      <MainContext.Provider
        value={{
          countries,
          numPages,
          setCurrPage,
          setSortBy,
          filterBySize,
          filterByRegion,
          setFilterByRegion,
          setFilterBySize,
        }}
      >
        <Header />
        <Controler />
        <List />
      </MainContext.Provider>
    </div>
  );
};

export default Main;
