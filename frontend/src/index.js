import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import { Initializer } from "./providers/Initializer/Initializer";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Initializer history={history} store={store}>
        <App history={history} />
      </Initializer>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
