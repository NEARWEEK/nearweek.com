import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.headers = { Accept: "application/json" };
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
export default axiosInstance;

const container = document.getElementById("nearweek-news");
const root = createRoot(container);
root.render(<App tab="home" />);
