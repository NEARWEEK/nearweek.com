import React, { useEffect, useState } from "react";
import Block from "./Block/Block";
import { useChainTransactionStats } from "../../../../libs/wamp/subscriptions";
import { api } from "../../../../Utils/Utils";

const TotalDaosBlock = () => {
  const [optionsData, setData] = useState({});
  const { count } = optionsData?.dao || 0;

  const getOptionData = async () => {
    const data = await api.getStatsDAO();
    setData(data);
  };

  useEffect(() => {
    getOptionData();
    return () => {
      setData({});
    };
  }, []);

  return <Block title={"DAOs"} data={count} />;
};

export default TotalDaosBlock;
