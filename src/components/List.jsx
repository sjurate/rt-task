import React, { useContext } from "react";
import MainContext from "./MainContext";
import Line from "./Line";

const List = () => {
  const { countries } = useContext(MainContext);

  return (
    <div className="countries-list-box">
      <ul className="countries-list">
        {countries?.map((country) =>
          country.show ? <Line key={country.name} country={country} /> : null
        )}
      </ul>
    </div>
  );
};

export default List;
