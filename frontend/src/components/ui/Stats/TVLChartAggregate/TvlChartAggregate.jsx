import React, { useEffect, useMemo, useState } from "react";
import { api, formattedNum } from "../../../../Utils/Utils";
import moment from "moment";
import * as echarts from "echarts";
import { withStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Change24HCount from "../Change24HCount/Change24HCount";
import ReactEcharts from "echarts-for-react";
import Loader from "../../general/Loader/Loader";
import * as _ from "lodash";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "20% 80%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  total: {
    color: "#0d00ff",
  },
};

const chartsStyle = {
  height: 480,
  marginBottom: 26,
};

const filter = {
  all: 0,
  "1w": -7,
  "1m": -30,
};

const TvlChartAggregate = (props) => {
  const { classes, show } = props;
  const [optionsData, setData] = useState({});

  useEffect(() => {
    (async () => {
      const data = await api.getTvlAggregate();
      setData({ ...data });
    })();
  }, []);

  //console.log(optionsData);

  const aggregateDates = useMemo(() => {
    if (optionsData.total) {
      return optionsData.total
        .map(({ date }) => {
          const format = "MMM D";
          return moment(date * 1000).format(format);
        })
        .slice(filter[show]);
    }
    return [];
  }, [optionsData]);

  //console.log(aggregateDates);

  const aggregateCount = useMemo(() => {
    let count = {};
    for (const key in optionsData) {
      count[key] = optionsData[key]
        .map(({ totalLiquidityUSD }) => {
          return Math.trunc(totalLiquidityUSD);
        })
        .slice(filter[show]);
    }
    return count;
  }, [optionsData]);

  const getOption = (title, seriesName, date) => {
    return {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
        position: "top",
        backgroundColor: "#25272A",
        formatter: function (params) {
          const formattedVal = formattedNum(params[0].value, true);
          return `${params[0].seriesName}<br />
              ${params[0].name}<br />
              ${params[0].seriesName}: ${formattedVal}`;
        },
      },
      grid: {
        left: "5%",
        bottom: "3%",
        containLabel: true,
        backgroundColor: "#F9F9F9",
        show: true,
        color: "white",
        borderWidth: 0,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#9B9B9B",
          },
          offset: 3,
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          position: "right",
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
          splitNumber: 3,
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: "#9B9B9B",
            formatter: function (value) {
              return formattedNum(value, true);
            },
          },
          offset: 3,
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: seriesName,
          type: "line",
          smooth: true,
          lineStyle: {
            color: "#001ede",
            width: 2,
          },
          symbol: "circle",
          itemStyle: {
            color: "#25272A",
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgba(0, 193, 222, 0.19)",
              },
              {
                offset: 1,
                color: "rgba(197, 247, 255, 0)",
              },
            ]),
          },
          data: aggregateCount.total,
        },
      ],
    };
  };

  if (Object.entries(optionsData).length === 0) {
    return <Loader />;
  }

  return (
    <Box className={classes.grid}>
      <Paper elevation={0} className={classes.card}>
        <Box p={4}>
          <Typography variant="h5" style={{ fontWeight: 900 }}>
            Total Value Locked
          </Typography>
          <Typography>24hr Total</Typography>
          <Typography
            className={classes.total}
            variant="h4"
            style={{ fontWeight: 900 }}
          >
            {aggregateCount?.total &&
              formattedNum(aggregateCount.total.slice(-1)[0], true)}
          </Typography>
          {aggregateCount?.total && (
            <Change24HCount
              last24htotal={aggregateCount.total.slice(-2)[0]}
              currentValue={aggregateCount.total.slice(-1)[0]}
            />
          )}
        </Box>
      </Paper>
      <Paper elevation={0}>
        <ReactEcharts
          option={getOption("", "TVL", aggregateDates)}
          style={chartsStyle}
        />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(TvlChartAggregate);
