import React, { useState, useEffect, useContext, useRef } from "react";
import MainContext from "./MainContext";
import Header from "./Header";
import Controler from "./Controler";
import List from "./List";

const Main = () => {
  const [countries, setCountries] = useState();
  const [sortBy, setSortBy] = useState("az");
  const [filterBySize, setFilterBySize] = useState(false);
  const [filterByRegion, setFilterByRegion] = useState(false);

  const filterOn = useRef(false);
  const filterWhat = useRef(null);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,area")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.map((d, i) => ({ ...d, show: true, row: i })));
      })
      .catch((_) => setCountries("ERROR"));
  }, [setCountries]);

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

  // useEffect(() => {
  //   if (filterByRegion) {
  //     setCountries((prev) =>
  //       prev.map((country) =>
  //         country.region === "Oceania"
  //           ? { ...country, show: true }
  //           : { ...country, show: false }
  //       )
  //     );
  //   } else {
  //     setCountries((prev) =>
  //       prev?.map((country) => ({ ...country, show: true }))
  //     );
  //   }
  // }, [filterByRegion]);

  return (
    <div className="main-page">
      <MainContext.Provider
        value={{
          countries,
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
