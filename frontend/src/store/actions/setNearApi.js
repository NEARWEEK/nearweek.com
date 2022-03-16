import { action } from "easy-peasy";

export const setNearApi = action((state, payload) => {
  const { near, keyStore, wallet } = payload;
  state.entities.near = near;
  state.entities.keyStore = keyStore;
  state.entities.wallet = wallet;
});
