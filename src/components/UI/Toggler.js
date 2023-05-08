import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import { ModeContext } from "../../shared/mode-context";

import "./Toggler.css";

const Toggler = (props) => {
  const modeContext = useContext(ModeContext);

  const chekboxLabelClasses = `checkbox-label ${
    modeContext.darkMode ? "label-dark" : ""
  }`;
  const ballClasses = `ball ${modeContext.darkMode ? "" : "ball-dark"}`;

  return (
    <div>
      <input
        type="checkbox"
        className="checkbox"
        id="checkbox"
        onChange={modeContext.toggleMode}
      />
      <label htmlFor="checkbox" className={chekboxLabelClasses}>
        <FaSun className="sun" />
        <FaMoon className="moon" />
        <span className={ballClasses}></span>
      </label>
    </div>
  );
};

export default Toggler;
