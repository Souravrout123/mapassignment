/** @format */

import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import CountryDetails from "./CountryDetails";

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  const fetchCountryData = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countriesData = response.data;
        setCountries(countriesData);
      })
      .catch((error) => {
        console.error("Error fetching country data:", error);
        setCountries([]);
      });
  };

  const onCountryClick = (event) => {
    const clickedCountry = event.target.options.country;
    setSelectedCountry(clickedCountry);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {countries.map((country, index) => (
        <Marker
          key={index}
          position={[country.latlng[0], country.latlng[1]]}
          eventHandlers={{
            click: onCountryClick,
          }}
          country={country}
        />
      ))}

      {selectedCountry && (
        <Popup
          position={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}
        >
          <CountryDetails country={selectedCountry} />
        </Popup>
      )}
    </MapContainer>
  );
};

export default WorldMap;
