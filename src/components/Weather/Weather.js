import React, { Fragment, useEffect, useState } from "react";

import Current from "./Current";
import Forecast from "./Forecast";

import {
  API_KEY as weatherApiKey,
  API_URL_CURRENT as currentWeatherApiUrl,
  API_URL_FORECAST as forecastApiUrl,
} from "../../apis/weather";

const Weather = (props) => {
  const { city } = props;

  const [cityName, setCityName] = useState("");

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = (lat, lon) => {
      const fetchCurrent = fetch(
        `${currentWeatherApiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
      );
      const fetchForeCast = fetch(
        `${forecastApiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
      );

      Promise.all([fetchCurrent, fetchForeCast])
        .then(async (response) => {
          const currentResult = await response[0].json();
          const forecastResult = await response[1].json();

          setCurrentWeather(currentResult);
          setForecastWeather(forecastResult);

          if (city.label) {
            setCityName(city.label);
          } else {
            setCityName(`${currentResult.name}, ${currentResult.sys.country}`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const [latitude, longitude] = city.value.split(" ");
    getWeatherData(latitude, longitude);
  }, [city]);

  return (
    <Fragment>
      {currentWeather && <Current city={cityName} weather={currentWeather} />}
      {forecastWeather && <Forecast weather={forecastWeather} />}
    </Fragment>
  );
};

export default Weather;
