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
  height: 352,
  marginTop: 26,
  marginBottom: 26,
};

const TransactionHistoryChart = (props) => {
  const { classes } = props;
  const transactionsCountHistoryForTwoWeeks =
    useChainTransactionStats()?.transactionsCountHistoryForTwoWeeks || [];
  const recentTransactionsCount =
    useChainTransactionStats()?.recentTransactionsCount;

  const getDate = () => {
    const format = "MMM D";
    const date = transactionsCountHistoryForTwoWeeks.map((t) =>
      moment(t.date).format(format)
    );
    return date;
  };

  const count = transactionsCountHistoryForTwoWeeks.map((t) => t.total);

  const getOption = () => {
    return {
      title: {
        text: "14 Day History",
      },
      tooltip: {
        trigger: "axis",
        position: "top",
        backgroundColor: "#25272A",
        formatter: `{b0}<br />${"Txns"}: {c0}`,
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
          data: getDate(),
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
          },
          offset: 3,
          axisTick: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "Txns",
          type: "line",
          smooth: true,
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
                color: "rgba(0, 193, 222, 0.19)",
              },
              {
                offset: 1,
                color: "rgba(197, 247, 255, 0)",
              },
            ]),
          },
          data: count,
        },
      ],
    };
  };

  const Change24HTransactionsCount = ({ recent = 0, last24htotal = 0 }) => {
    const changes = ((recent - last24htotal) / last24htotal) * 100 || undefined;
    const boxColor = changes < 0 ? "red" : "#27e3a8";
    return (
      <>
        {changes && (
          <Box
            display="flex"
            alignItems="center"
            style={{ color: boxColor, fontWeight: 600, fontSize: "1.25rem" }}
          >
            {changes > 0 ? (
              <>
                <ArrowDropUpIcon />+{changes.toFixed(2)}%
              </>
            ) : (
              <>
                <ArrowDropDownIcon />
                {changes.toFixed(2)}%
              </>
            )}
          </Box>
        )}
      </>
    );
  };

  return (
    <Box className={classes.grid} mt={4}>
      <Paper elevation={0} className={classes.card}>
        <Box p={4}>
          <Typography variant="h5" style={{ fontWeight: 900 }}>
            Total Transactions
          </Typography>
          <Typography>24hr Total</Typography>
          <Typography
            className={classes.total}
            variant="h3"
            style={{ fontWeight: 900 }}
          >
            {recentTransactionsCount}
          </Typography>
          <Change24HTransactionsCount
            last24htotal={count.slice(-1)[0]}
            recent={recentTransactionsCount}
          />
        </Box>
      </Paper>
      <Paper elevation={0}>
        <ReactEcharts option={getOption()} style={chartsStyle} />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(TransactionHistoryChart);
