import { connect, keyStores, WalletConnection } from "near-api-js";
import { nearConfig } from "../../config/nearConfig";

const { networkId, nodeUrl, walletUrl } = nearConfig;

export const getNearApi = async () => {
  const near = await connect({
    ...nearConfig,
  });

  const wallet = new WalletConnection(near, "nearweek");

  return {
    near,
    wallet,
  };
};
