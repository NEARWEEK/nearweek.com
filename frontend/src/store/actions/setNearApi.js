import { action } from "easy-peasy";

export const setNearApi = action((state, payload) => {
  const { near, wallet } = payload;
  state.entities = { near, wallet };
});
