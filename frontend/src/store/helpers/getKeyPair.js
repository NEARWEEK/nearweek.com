import { nearConfig } from "../../config/nearConfig";

const { networkId } = nearConfig;

export const getKeyPair = async (state) => {
  const wallet = state.main.entities.wallet;
  const keyStore = wallet._keyStore;
  const accountId = wallet.getAccountId();
  return await keyStore.getKey(networkId, accountId);
};
