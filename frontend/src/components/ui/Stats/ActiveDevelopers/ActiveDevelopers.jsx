import React, { useEffect, useState } from "react";
import { api, formattedNum } from "../../../../Utils/Utils";
import moment from "moment";
import * as echarts from "echarts";
import Loader from "../../general/Loader/Loader";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Change24HCount from "../Change24HCount/Change24HCount";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@mui/styles";

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

const ActiveDevelopers = (props) => {
  const { classes, show } = props;
  const [optionsData, setData] = useState({});

  const getOptionData = async (dateRange) => {
    const { series } = await api.getActiveDevelopers(dateRange);
    setData(series["Monthly Active User"]);
  };

  useEffect(() => {
    getOptionData(show);
    return () => {
      setData({});
    };
  }, [show]);

  const optionsDates = React.useMemo(
    () =>
      Object.keys(optionsData).map((date) => {
        const format = "MMM D";
        return moment(date).format(format);
      }),
    [optionsData]
  );

  const count = Object.keys(optionsData).map((date) => {
    return optionsData[date];
  });

  const getOption = (title, seriesName, data, date) => {
    return {
      title: {
        text: title,
      },
      tooltip: {
        trigger: "axis",
        position: "top",
        backgroundColor: "#25272A",
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
          data: data,
        },
      ],
    };
  };

  if (Object.entries(optionsData).length === 0) {
    return <Loader />;
  }

  return (
    <Box className={classes.grid}>
      <Paper elevation={0}>
        <ReactEcharts
          option={getOption("", "users", count, optionsDates)}
          style={chartsStyle}
        />
      </Paper>
    </Box>
  );
};

export default withStyles(styles)(ActiveDevelopers);
