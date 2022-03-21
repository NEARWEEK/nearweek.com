import { thunk } from "easy-peasy";
import qs from "query-string";

export const getRoute = {
  callbackUrl: (params) =>
    `${window.location.origin}${window.location.pathname}?${qs.stringify(
      params
    )}`,
};

export const onConnectWallet = thunk(async (actions, _, helpers) => {
  const store = helpers.getStoreState();
  const wallet = store.main.entities.wallet;
  const redirectAction = "redirect-from-wallet";

  wallet.requestSignIn({
    successUrl: getRoute.callbackUrl({ redirectAction }),
    failureUrl: getRoute.callbackUrl({
      redirectAction,
      errorCode: "userReject",
    }),
  });
});
