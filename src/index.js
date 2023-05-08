import React from "react";
import ReactDOM from "react-dom/client";

import { ModeContextProvider } from "./shared/mode-context";
import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ModeContextProvider>
    <App />
  </ModeContextProvider>
);
