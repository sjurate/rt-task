import React, { useState, useEffect } from "react";
import axios from "axios";
import MainContext from "./MainContext";
import Header from "./Header";
import Controler from "./Controler";
import List from "./List";
import Pagination from "./Pagination";

const Main = () => {
  const [countries, setCountries] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [sortBy, setSortBy] = useState("");
  const [filterBySize, setFilterBySize] = useState(false);
  const [filterByRegion, setFilterByRegion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(20);
  const [totalCountries, setTotalCountries] = useState(0);
  const [currentCountries, setCurrentCountries] = useState();
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      const res = await axios
        .get("https://restcountries.com/v2/all?fields=name,region,area")
        .then((res) => {
          if (filterBySize && filterByRegion) {
            setCountries(
              res.data.map((country, i) =>
                Number(country.area) < 65300 && country.region === "Oceania"
                  ? { ...country, show: true }
                  : { ...country, show: false }
              )
            );
          } else if (filterBySize) {
            setCountries(
              res.data.map((country, i) =>
                country.area < 65300
                  ? { ...country, show: true, row: i }
                  : { ...country, show: false, row: i }
              )
            );
          } else if (filterByRegion) {
            setCountries(
              res.data.map((country, i) =>
                country.region === "Oceania"
                  ? { ...country, show: true, row: i }
                  : { ...country, show: false, row: i }
              )
            );
          } else {
            setCountries(
              res.data.map((country, i) => ({ ...country, show: true, row: i }))
            );
          }
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
      setLoading(false);
    };
    fetchCountries();
  }, [lastUpdate]);

  // Get all countries that are displayed (show === true)
  useEffect(() => {
    if (countries) {
      setDisplayedCountries((prev) =>
        countries?.filter((c) => c.show === true)
      );
    }
  }, [countries]);

  // Get countries for the current page
  useEffect(() => {
    if (displayedCountries) {
    }
    setTotalCountries(displayedCountries?.length);
    setCurrentCountries((prev) =>
      displayedCountries?.slice(indexOfFirstCountry, indexOfLastCountry)
    );
  }, [displayedCountries, indexOfLastCountry]);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sorting functionality
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
          setLastUpdate,
          loading,
          currentCountries,
          setSortBy,
          filterBySize,
          filterByRegion,
          setFilterByRegion,
          setFilterBySize,
          setCurrentPage,
          countriesPerPage,
          totalCountries,
          paginate,
          currentPage,
        }}
      >
        <Header />
        <Controler />
        <List />
        <Pagination />
      </MainContext.Provider>
    </div>
  );
};

export default Main;
