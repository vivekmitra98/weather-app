import React, { useEffect, useState } from "react";

import ForecastItem from "./ForecastItem";

import "./Forecast.css";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Forecast = (props) => {
  const { weather } = props;

  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const modifyForecastData = () => {
      const forecastData = [];
      const modifiedForecastData = [];
      for (let i = 0; i < weather.list.length; i += 8) {
        forecastData.push(
          weather.list.filter((item, index) => index >= i && index < i + 8)
        );
      }
      forecastData.forEach((dataArray, index) => {
        let minTemp = 1000;
        let maxTemp = -1000;
        let iconId;
        let date;
        let day;
        let description;

        iconId = dataArray[0].weather[0].icon;
        const today = new Date(dataArray[0].dt * 1000);
        date = today.toLocaleString("en-In", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });
        day = WEEK_DAYS[today.getDay()];
        description = dataArray[0].weather[0].description;

        for (let i = 0; i < dataArray.length; i++) {
          minTemp = Math.min(minTemp, dataArray[i].main.temp_min);
          maxTemp = Math.max(minTemp, dataArray[i].main.temp_max);
        }

        modifiedForecastData.push({
          id: index,
          date: date,
          day: day,
          description: description,
          min: minTemp,
          max: maxTemp,
          icon: iconId,
        });
      });

      setForecast(modifiedForecastData);
    };

    modifyForecastData();
  }, [weather]);

  return (
    forecast.length !== 0 && (
      <div className="forecast">
        <h2 className="forecast-title">5 Day Forecast</h2>
        {forecast.map((item) => (
          <ForecastItem key={item.id} weather={item} />
        ))}
      </div>
    )
  );
};

export default Forecast;
