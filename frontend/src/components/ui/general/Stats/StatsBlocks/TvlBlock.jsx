import React, { useEffect, useState } from "react";
import Block from "./Block/Block";
import { api, formattedNum } from "../../../../../Utils/Utils";
import Typography from "@mui/material/Typography";

const TvlBlock = () => {
  const [optionsData, setData] = useState([]);

  const getOptionData = async () => {
    const data = await api.getTvl("near");
    setData(data);
  };

  const count = optionsData.map((t) => {
    return Math.trunc(t.totalLiquidityUSD);
  });

  useEffect(() => {
    getOptionData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <Block
      title={"Value Locked"}
      data={formattedNum(count.slice(-1)[0], true)}
      icon={true}
    />
  );
};

export default TvlBlock;
