const testnet = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
  wampNearExplorerUrl: "wss://wamp-pr-966.onrender.com/ws",
  isTestnet: true,
};

const mainnet = {
  networkId: "mainnet",
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.near.org",
  wampNearExplorerUrl: "ws://127.0.0.1:8080/ws",
  isTestnet: false,
};

const configs = {
  testnet,
  mainnet,
};

const getNearConfig = (network) => {
  const config = configs[network];
  return {
    ...config,
  };
};

export const nearConfig = getNearConfig(process.env.REACT_APP_NETWORK);
