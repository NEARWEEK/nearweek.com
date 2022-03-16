import qs from "query-string";
import { connectWallet } from "./connectWallet";

export const redirectFromWallet = async (state, actions, history) => {
  const query = qs.parse(history.location.search);
  const { redirectAction } = query;

  console.log("redirectAction", redirectAction);

  /*  if (redirectAction === redirectPages.connectWallet)
    await connectWallet({ state, actions, history, query });*/
};
