import { onInitApp } from "./onInitApp";
import { onConnectWallet } from "./onConnectWallet";
import { onAddToCalendar } from "./onAddToCalendar";
import { onDisconnectWallet } from "./onDisconnectWallet";
import { onSubmitArticle } from "./onSubmitArticle";
import { onRedirectFromWallet } from "./onRedirectFromWallet";

export const thunks = {
  onInitApp,
  onConnectWallet,
  onRedirectFromWallet,
  onAddToCalendar,
  onDisconnectWallet,
  onSubmitArticle,
};
