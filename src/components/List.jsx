import React, { useContext } from "react";
import MainContext from "./MainContext";
import Line from "./Line";

const List = () => {
  const { countries, numPages, setCurrPage } = useContext(MainContext);

  return (
    <>
      <div className="countries-list-box">
        <ul className="countries-list">
          {countries?.map((country) =>
            country.show ? <Line key={country.name} country={country} /> : null
          )}
        </ul>
      </div>
      <div className="pages">
        {[...Array(numPages)].map((number, i) => (
          <div
            key={i}
            className="page-number"
            onClick={() => setCurrPage((prev) => i + 1)}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
