import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { api } from "../../../../../Utils/Utils";

const PriceChart = () => {
  const [optionsData, setData] = useState([]);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: optionsData.map((item) => item.date).slice(-31),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: optionsData.map((item) => item.price).slice(-31),
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  useEffect(() => {
    const getOption = async () => {
      const data = await api.getStatsMarketChart();
      setData(data);
    };
    getOption();
  }, []);

  return <>{optionsData && <ReactECharts option={options} />}</>;
};

export default PriceChart;
