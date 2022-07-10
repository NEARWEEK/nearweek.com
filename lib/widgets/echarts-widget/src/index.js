import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Initializer } from "./providers/Initializer/Initializer";

const container = document.getElementById("nearweek-charts");
const root = createRoot(container);
root.render(
  <Initializer>
    <App />
  </Initializer>
);
