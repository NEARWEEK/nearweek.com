import { thunk } from "easy-peasy";
import qs from "query-string";
import { Buffer } from "buffer";

export const getRoute = {
  callbackUrl: (params) =>
    `${window.location.origin}/user-profile?${qs.stringify(params)}`,
};

export const onConnectWallet = thunk(async (actions, payload, helpers) => {
  const store = helpers.getStoreState();
  const wallet = store.main.entities.wallet;
  const redirectAction = "redirect-from-wallet";

  // wallet.requestSignIn({ successUrl: redirectAction });
  wallet.requestSignIn({
    successUrl: getRoute.callbackUrl({ redirectAction }),
    failureUrl: getRoute.callbackUrl({
      redirectAction,
      errorCode: "userReject",
    }),
  });
});
