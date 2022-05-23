import { action } from "easy-peasy";
import { initState } from "../initState";

export const resetState = action((state) => {
  state = initState;
});
