import { keyStores } from "near-api-js";

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const testnet = {
  keyStore,
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  wampNearExplorerUrl: `${process.env.REACT_APP_NEAR_EXPLORER_WAMP_HOST}`,
  isTestnet: true
};

const mainnet = {
  keyStore,
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.near.org",
  wampNearExplorerUrl: `${process.env.REACT_APP_NEAR_EXPLORER_WAMP_HOST}`,
  isTestnet: false
};

const configs = {
  testnet,
  mainnet
};

const getNearConfig = (network) => {
  const config = configs[network];
  return {
    ...config
  };
};

export const nearConfig = getNearConfig(process.env.REACT_APP_NETWORK);
