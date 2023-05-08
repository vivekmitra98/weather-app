import React, { useContext } from "react";
import _ from "lodash";

import { ModeContext } from "../../shared/mode-context";

import "./ForecastItem.css";

const ForecastItem = (props) => {
  const { weather } = props;

  const modeContext = useContext(ModeContext);

  const mainClasses = `forecast-item border-${
    modeContext.darkMode ? "light" : "dark"
  }`;

  return (
    <div className={mainClasses}>
      <div className="left">
        <div className="day-date">
          <p className="forecast-day">{weather.day}</p>
          <p className="forecast-date">{weather.date}</p>
        </div>
        <img
          className="forecast-icon"
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
        />
      </div>
      <div className="right">
        <p className="forecast-description">
          {_.capitalize(weather.description)}
        </p>
        <p className="forecast-temps">
          {Math.round(weather.min)}°C / {Math.round(weather.max)}°C
        </p>
      </div>
    </div>
  );
};

export default ForecastItem;
