import * as React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { withStyles } from "@mui/styles";
import { useWampSimpleQuery } from "../../../../libs/wamp/wamp";

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

const ActiveContractsChart = (props) => {
  const { classes, show } = props;
  const contractsByDate =
    useWampSimpleQuery("active-contracts-count-aggregated-by-date", []) ?? [];
  const contractsByDateCount = React.useMemo(
    () =>
      contractsByDate
        .map(({ contractsCount }) => contractsCount)
        .slice(filter[show]),
    [contractsByDate]
  );
  const contractsByDateDates = React.useMemo(
    () =>
      contractsByDate.map(({ date }) => date.slice(0, 10)).slice(filter[show]),
    [contractsByDate]
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
          data: contractsByDateDates,
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
            color: "#04a7bf",
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
                color: "rgb(4, 167, 191)",
              },
              {
                offset: 1,
                color: "rgb(201, 248, 255)",
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
            "Daily Number of Active Contracts",
            "Active Contracts",
            contractsByDateCount
          )}
          style={chartsStyle}
        />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(ActiveContractsChart);
