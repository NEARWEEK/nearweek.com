import * as React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import { useWampSimpleQuery } from "../../../../libs/wamp/wamp";
import { useMemo } from "react";
import { cumulativeSumArray } from "../../../../libs/stats";

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
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
  marginTop: 26,
  marginBottom: 26,
};

const filter = {
  all: 0,
  "1w": -7,
  "1m": -30,
};

const DailyTransactionsChart = (props) => {
  const { classes, show } = props;

  const showTotal = filter[show] === 0;

  const transactionCountByDate =
    useWampSimpleQuery("transactions-count-aggregated-by-date", []) ?? [];

  const transactionsByDate = useMemo(
    () =>
      transactionCountByDate
        .map(({ transactionsCount }) => Number(transactionsCount))
        .slice(filter[show]),
    [transactionCountByDate]
  );
  const transactionsByDateCumulative = useMemo(
    () => cumulativeSumArray(transactionsByDate),
    [transactionsByDate]
  );
  const transactionDates = useMemo(
    () =>
      transactionCountByDate
        .map(({ date }) => date.slice(0, 10))
        .slice(filter[show]),
    [transactionCountByDate]
  );

  const getOption = (title, seriesName, data) => {
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
          data: transactionDates,
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
            color: "#00C1DE",
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
                color: "rgb(0, 193, 222)",
              },
              {
                offset: 1,
                color: "rgb(197, 247, 255)",
              },
            ]),
          },
          data: data,
        },
      ],
    };
  };

  return (
    <Box className={classes.grid}>
      <Paper elevation={0}>
        {showTotal ? (
          <ReactEcharts
            option={getOption(
              "Total Number of Transactions",
              "Txns",
              transactionsByDateCumulative
            )}
            style={chartsStyle}
          />
        ) : (
          <ReactEcharts
            option={getOption(
              "Daily Number of Transactions",
              "Txns",
              transactionsByDate
            )}
            style={chartsStyle}
          />
        )}
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(DailyTransactionsChart);
