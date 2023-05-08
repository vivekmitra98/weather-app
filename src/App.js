import React, { Fragment, useEffect, useState } from "react";

import Search from "./components/Search/Search";
import Toggler from "./components/UI/Toggler";
import Loader from "./components/UI/Loader";
import Weather from "./components/Weather/Weather";

import "./App.css";

function App() {
  const [city, setCity] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCity({
            value: `${position.coords.latitude} ${position.coords.longitude}`,
            label: null,
          });
        });
      }
    };

    getLocation();
  }, []);

  const searchTextChangeHandler = (selectedCity) => {
    setCity(selectedCity);
  };

  return (
    <Fragment>
      <div className="header">
        <h1 className="title">WeatherApp</h1>
        <Toggler />
      </div>
      <Search onSearchTextChange={searchTextChangeHandler} />
      {!city && <Loader />}
      {city && (
        <div className="main">
          <Weather city={city} />
        </div>
      )}
    </Fragment>
  );
}

export default App;
