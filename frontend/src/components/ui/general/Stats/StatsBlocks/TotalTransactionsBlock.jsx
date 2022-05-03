import React from "react";
import Block from "./Block/Block";
import { useChainTransactionStats } from "../../../../../libs/wamp/subscriptions";

const TotalTransactionsBlock = () => {
  const recentTransactionsCount =
    useChainTransactionStats()?.recentTransactionsCount;
  return <Block title={"Transactions"} data={recentTransactionsCount} />;
};

export default TotalTransactionsBlock;
