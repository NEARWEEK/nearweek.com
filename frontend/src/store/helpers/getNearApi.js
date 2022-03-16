import { connect, keyStores, WalletConnection } from "near-api-js";
import { nearConfig } from "../../config/nearConfig";

const { networkId, nodeUrl, walletUrl } = nearConfig;

export const getNearApi = async () => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  const near = await connect({
    networkId,
    nodeUrl,
    walletUrl,
    keyStore,
  });

  const wallet = new WalletConnection(near, "nearweek");

  return {
    near,
    wallet,
    keyStore,
  };
};
