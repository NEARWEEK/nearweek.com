import { thunk } from "easy-peasy";
import { getNearApi } from "../helpers/getNearApi";
import { Buffer } from "buffer";

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const setNearApi = actions.setNearApi;

  setNearApi(await getNearApi());

  setInit(true);
});
