import qs from "query-string";
import { thunk } from "easy-peasy";
import { getNearApi } from "../helpers/getNearApi";
import { Buffer } from "buffer";

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const { redirectAction } = qs.parse(history.location.search);
  const onRedirectFromWallet = actions.onRedirectFromWallet;
  const setNearApi = actions.setNearApi;

  const nearApi = await getNearApi();
  setNearApi(nearApi);

  if (redirectAction && redirectAction === "redirect-from-wallet")
    onRedirectFromWallet({ history });

  setInit(true);
});
