import React from "react";
import wampApi from "./api";

const networkId = process.env.REACT_APP_NETWORK || "testnet";

export const useWampCall = () => {
  return React.useCallback(wampApi.getCall(networkId), [networkId]);
};

export const useWampQuery = (fetcher) => {
  const [value, setValue] = React.useState();
  const wampCall = useWampCall();
  const fetchValue = React.useCallback(
    async () => setValue(await fetcher(wampCall)),
    [setValue, fetcher, wampCall]
  );
  React.useEffect(() => {
    void fetchValue().catch((error) => {
      console.error(new Error("WAMP call fail").stack);
      console.error(error);
    });
  }, [fetchValue]);
  return value;
};

export const useWampSimpleQuery = (procedure, args) =>
  useWampQuery(
    React.useCallback((wampCall) => wampCall(procedure, args), args)
  );

export const useWampSubscription = (topic) => {
  const [value, setValue] = React.useState();
  React.useEffect(
    () => wampApi.subscribe(networkId, topic, setValue),
    [networkId, topic, setValue]
  );
  return value;
};
