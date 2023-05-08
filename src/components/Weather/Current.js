import React, { useContext } from "react";
import _ from "lodash";

import { ModeContext } from "../../shared/mode-context";

import "./Current.css";

const Current = (props) => {
  const { city, weather } = props;

  const modeContext = useContext(ModeContext);

  const mainClasses = `current border-${
    modeContext.darkMode ? "light" : "dark"
  }`;

  const convertVisibility = (visibility) => {
    let value = Number(visibility);
    if (value < 1000) return value + "m";
    if (value % 1000 === 0) return value / 1000 + "km";
    value = (value / 1000).toFixed(1);
    return value + "km";
  };

  return (
    <div className={mainClasses}>
      <div className="top">
        <div className="city-description">
          <p className="city">{city}</p>
          <p className="description">
            {_.capitalize(weather.weather[0].description)}
          </p>
        </div>
        <div className="icon">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(weather.main.temp)}°C</p>
        <div className="details">
          <p>
            <span className="label">Feels like</span>
            <span className="value">
              {Math.round(weather.main.feels_like)}°C
            </span>
          </p>
          <p>
            <span className="label">Humidity</span>
            <span className="value">{weather.main.humidity}%</span>
          </p>
          <p>
            <span className="label">Visibility</span>
            <span className="value">
              {convertVisibility(weather.visibility)}
            </span>
          </p>
          <p>
            <span className="label">Wind speed</span>
            <span className="value">{weather.wind.speed}m/s</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Current;
