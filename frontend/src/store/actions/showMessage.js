import { action } from "easy-peasy";

export const showMessage = action((state, payload) => {
  state.messages = payload;
});
