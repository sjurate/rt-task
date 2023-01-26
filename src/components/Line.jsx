import React from "react";

const Line = ({ country }) => {
  return (
    <li className="country-line" country={country}>
      <div className="country-name">{country.name}</div>
      <div className="country-region">({country.region})</div>
      <div className="country-area">Area: {country.area}</div>
    </li>
  );
};

export default Line;
