import { useMemo } from "react";
import { useWampSimpleQuery } from "../../libs/wamp/wamp";
import ReactEchartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/lib/echarts";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import moment from "moment";

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer
]);

const filter = {
  all: 0,
  "1w": -7,
  "1m": -30
};

const ActiveAccountsChart = (props) => {
  const { show } = props;
  const accountsByDateCount =
    useWampSimpleQuery("active-accounts-count-aggregated-by-date", []) ?? [];

  const accountsByDate = useMemo(
    () =>
      accountsByDateCount
        .map(({ accountsCount }) => Number(accountsCount))
        .slice(filter[show]),
    [accountsByDateCount, show]
  );
  const accountsByDateDate = useMemo(
    () =>
      accountsByDateCount
        .map(({ date }) => date.slice(0, 10))
        .slice(filter[show]),
    [accountsByDateCount, show]
  );

  const getOption = (title, seriesName, data, date) => {
    return {
      backgroundColor: "transparent",
      legend: {
        show: true,
        textStyle: {
          color: "inherit"
        }
      },
      title: {
        text: title
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: [
        {
          name: "Weekly Number of Active Accounts",
          nameLocation: "end",
          nameGap: 0,
          nameTextStyle: {
            align: "right",
            verticalAlign: "top",
            padding: [30, 0, 0, 0]
          },
          axisLabel: {
            formatter: function (params) {
              return moment(params).format("MMM DD");
            },
            fontSize: "8",
            color: "inherit"
          },
          show: true,
          type: "category",
          boundaryGap: false,
          data: date
        }
      ],
      yAxis: [
        {
          show: false,
          type: "value",
          splitLine: {
            lineStyle: {
              color: "white"
            }
          }
        }
      ],
      dataZoom: [],
      series: [
        {
          name: seriesName,
          type: "line",
          lineStyle: {
            color: "#5f02f5",
            width: 1
          },
          symbol: "circle",
          itemStyle: {
            color: "#5f02f5"
          },
          data: data
        }
      ]
    };
  };

  return (
    <div id="echart" className="rounded-xl py-2 bg-gray-100 dark:bg-gray-900">
      <ReactEchartsCore
        echarts={echarts}
        option={getOption(
          "",
          "Active Accounts",
          accountsByDate,
          accountsByDateDate
        )}
        style={{ height: "100%", minHeight: 200, width: "100%" }}
      />
    </div>
  );
};

export default ActiveAccountsChart;
