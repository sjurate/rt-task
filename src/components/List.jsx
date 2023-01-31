import React, { useContext } from "react";
import MainContext from "./MainContext";
import Line from "./Line";

const List = () => {
  const { currentCountries, loading } = useContext(MainContext);

  if (loading) {
    return (
      <div className="countries-list-box">
        <div id="loading"></div>
      </div>
    );
  }

  return (
    <>
      <div className="countries-list-box">
        <ul className="countries-list">
          {currentCountries?.map((country) =>
            country.show ? <Line key={country.name} country={country} /> : null
          )}
        </ul>
      </div>
    </>
  );
};

export default List;
