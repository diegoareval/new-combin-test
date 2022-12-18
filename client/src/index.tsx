import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setAxiosConfiguration } from "./interceptors";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// axios configuration to obtain token and validador of Request and Response
setAxiosConfiguration();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
