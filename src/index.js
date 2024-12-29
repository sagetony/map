import React from "react";
import ReactDOM from "react-dom/client"; // Use the new ReactDOM API
import "./styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create a root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
