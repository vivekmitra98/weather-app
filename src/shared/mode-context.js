import { createContext, useEffect, useState } from "react";

const ModeContext = createContext({
  darkMode: false,
  toggleMode: () => {},
});

const ModeContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode === true) {
      document.querySelector("body").classList.add("dark");
    } else {
      document.querySelector("body").classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkModeHandler = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ModeContext.Provider
      value={{ darkMode: darkMode, toggleMode: toggleDarkModeHandler }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export { ModeContext, ModeContextProvider };
