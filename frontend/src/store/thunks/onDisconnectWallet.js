import { thunk } from "easy-peasy";

export const onDisconnectWallet = thunk(
  async (_, payload, { getStoreActions }) => {
    const actions = getStoreActions();
    try {
      const resetState = actions.resetState;
      localStorage.clear();
      resetState();
    } catch (e) {
      console.log(`Error: ${e}`);
    } finally {
      document.location.reload();
    }
  }
);
