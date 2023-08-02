import React from 'react';

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages).join(', ')}</p>
      <p>Currency: {Object.keys(country.currencies).join(', ')}</p>
    </div>
  );
};

export default CountryDetails;
