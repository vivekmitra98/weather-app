import React, { useContext, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { ModeContext } from "../../shared/mode-context";

import {
  BASE_API_URL as placesApiUrl,
  API_OPTIONS as placesApiOptions,
} from "../../apis/places";

import "./Search.css";

const Search = (props) => {
  const [selectedCity, setSelectedCity] = useState("");

  const modeContext = useContext(ModeContext);

  const loadOptions = (inputValue) => {
    return fetch(
      `${placesApiUrl}minPopulation=100000&namePrefix=${inputValue}`,
      placesApiOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (!result.data) {
          return { options: [] };
        }
        return {
          options: result.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchTextChangeHandler = (selectedOption) => {
    setSelectedCity(selectedOption);
    props.onSearchTextChange(selectedOption);
    setSelectedCity("");
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      color: "#121212",
      border:
        !state.isFocused &&
        `1px solid ${modeContext.darkMode ? "#ffde19" : "#121212"}`,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#2684FF" : null,
      color: state.isFocused ? "#f5f5f5" : "#121212",
    }),
  };

  return (
    <div className="search">
      <AsyncPaginate
        placeholder="Search City"
        debounceTimeout={500}
        value={selectedCity}
        onChange={searchTextChangeHandler}
        loadOptions={loadOptions}
        styles={customStyles}
      />
    </div>
  );
};

export default Search;
