import qs from "query-string";
import { thunk } from "easy-peasy";
import { getNearApi } from "../helpers/getNearApi";
import { Buffer } from "buffer";

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const { redirectAction } = qs.parse(history.location.search);

  const setNearApi = actions.setNearApi;

  setNearApi(await getNearApi());

  if (redirectAction && redirectAction === "redirect-from-wallet")
    history.replace(history.location.pathname);

  setInit(true);
});
