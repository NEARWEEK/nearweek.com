import { onInitApp } from "./onInitApp";
import { onConnectWallet } from "./onConnectWallet";
import { onAddToCalendar } from "./onAddToCalendar";
import { onDisconnectWallet } from "./onDisconnectWallet";

export const thunks = {
  onInitApp,
  onConnectWallet,
  onAddToCalendar,
  onDisconnectWallet,
};
