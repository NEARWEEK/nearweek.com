import { action } from "easy-peasy";

export const hideMessage = action((state) => {
  state.messages = null;
});
