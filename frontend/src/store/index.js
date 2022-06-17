import { createStore } from "easy-peasy";
import { persist } from "easy-peasy";
import { initState } from "./initState";
import { actions } from "./actions";
import { thunks } from "./thunks";

export const main = persist(
  {
    ...initState,
    ...actions,
    ...thunks,
  },
  {
    storage: "localStorage",
    allow: ["error"],
  }
);

export const store = createStore(
  {
    main,
  },
  {
    name: "Nearweek",
  }
);
