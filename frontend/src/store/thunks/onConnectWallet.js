import { thunk } from "easy-peasy";
import qs from "query-string";

export const getRoute = {
  callbackUrl: (params) =>
    `${window.location.origin}${window.location.pathname}?${qs.stringify(
      params
    )}`,
};

export const onConnectWallet = thunk(async (actions, _, helpers) => {
  const state = helpers.getStoreState();
  const wallet = state.main.entities.wallet;
  const redirectAction = "redirect-from-wallet";

  await wallet.requestSignIn({
    contractId: process.env.REACT_APP_CONTRACT_ID,
    successUrl: getRoute.callbackUrl({ redirectAction }),
    failureUrl: getRoute.callbackUrl({
      redirectAction,
      errorCode: "userReject",
    }),
  });
});
