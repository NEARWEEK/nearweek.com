import * as React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import moment from "moment";
import { useChainTransactionStats } from "../../../../../libs/wamp/subscriptions";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useWampSimpleQuery } from "../../../../../libs/wamp/wamp";
import { cumulativeSumArray } from "../../../../../libs/stats";
import Change24HCount from "../Change24HCount/Change24HCount";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "100%",
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

const NewAccountsChart = (props) => {
  const { classes, show } = props;
  const newAccounts =
    useWampSimpleQuery("new-accounts-count-aggregated-by-date", []) ?? [];

  const newAccountsCount = React.useMemo(
    () =>
      newAccounts
        .map(({ accountsCount }) => Number(accountsCount))
        .slice(filter[show]),
    [newAccounts]
  );

  const newAccountsDate = React.useMemo(
    () => newAccounts.map(({ date }) => date.slice(0, 10)).slice(filter[show]),
    [newAccounts]
  );
  const cumulativeNewAccountsByDate = React.useMemo(
    () => cumulativeSumArray(newAccountsCount),
    [newAccountsCount]
  );

  const getOption = (title, seriesName, data, date) => {
    return {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
        backgroundColor: "#F9F9F9",
        show: true,
        color: "white",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: date,
        },
      ],
      yAxis: [
        {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
          filterMode: "filter",
        },
        {
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: seriesName,
          type: "line",
          lineStyle: {
            color: "#48d4ab",
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
                color: "rgb(72, 212, 171)",
              },
              {
                offset: 1,
                color: "rgb(201, 255, 239)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
  };

  return (
    <Box className={classes.grid} mt={4}>
      <Paper elevation={0}>
        <ReactEcharts
          option={getOption(
            "",
            "New Accounts",
            cumulativeNewAccountsByDate,
            newAccountsDate
          )}
          style={chartsStyle}
        />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(NewAccountsChart);
