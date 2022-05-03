import React from "react";
import Block from "./Block/Block";
import { useChainTransactionStats } from "../../../../../libs/wamp/subscriptions";

const TotalDistributedBlock = () => {
  const recentTransactionsCount =
    useChainTransactionStats()?.recentTransactionsCount;

  return (
    <Block title={"Distributed"} data={recentTransactionsCount} icon={true} />
  );
};

export default TotalDistributedBlock;
