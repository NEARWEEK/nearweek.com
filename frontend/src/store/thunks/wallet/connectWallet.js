import { routes } from "../../../../../config/routes";

const onSuccess = async (state, actions, history, query) => {
  console.log("onSuccess");
  //  const destination = routes.home;
  //  history.replace(destination);
};

const onError = (actions, history) => {
  console.log("onError");
  /*  actions.main.setError({
    isError: true,
    description: "You have not connected your wallet",
  });*/
  //history.replace(routes.connectWallet);
};

export const connectWallet = async ({ state, actions, history, query }) => {
  //actions.clearTemporaryData();
  if (query.account_id) await onSuccess(state, actions, history, query);
  if (query.errorCode) onError(actions, history);
};
