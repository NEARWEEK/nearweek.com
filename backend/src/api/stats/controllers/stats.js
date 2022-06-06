const axios = require("axios");
const moment = require("moment");
const CoinGecko = require("coingecko-api");
const btoa = require("btoa");

const CoinGeckoClient = new CoinGecko();

module.exports = {
  async price() {
    try {
      const getPrice = async (coinId) => {
        return CoinGeckoClient.coins.fetch(coinId, {
          localization: false,
          tickers: false,
        });
      };

      const stats = await Promise.all([
        getPrice("near"),
        getPrice("aurora-near"),
        getPrice("trisolaris"),
        getPrice("ref-finance"),
        getPrice("octopus-network"),
        getPrice("flux-token"),
      ]);

      return stats;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async list() {
    try {
      const stats = await CoinGeckoClient.coins.list();

      return stats.data;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async marketChart() {
    try {
      const stats = await CoinGeckoClient.coins.fetchMarketChart("near", {
        days: "max",
      });

      let prices = [];

      stats.data.prices.forEach((price) =>
        prices.push({
          date: moment(price[0]).format("YYYY-MM-DD"),
          price: price[1],
        })
      );
      return prices;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async tvl(ctx) {
    try {
      const { q } = ctx.query;
      const url = `${process.env.TVL_CHART_API}/charts/${q}`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async tvlAggregate(ctx) {
    try {
      const protocols = ["near", "aurora"];
      let charts = { total: [] };
      for (const protocol of protocols) {
        const url = `${process.env.TVL_CHART_API}/charts/${protocol}`;
        const response = await axios.get(url);
        charts[protocol] = response.data;
      }
      charts.total = Array.from(charts["near"]).map((near) => {
        const aggregate = charts["aurora"].find(
          (aurora) => aurora.date === near.date
        );
        return {
          date: near.date,
          totalLiquidityUSD: aggregate
            ? Number(aggregate.totalLiquidityUSD) +
              Number(near.totalLiquidityUSD)
            : near.totalLiquidityUSD,
        };
      });

      return charts;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async dao(ctx) {
    try {
      const { q } = ctx.query;
      const url = `${process.env.DAO_STATS_API}`;
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async activeDevelopers(ctx) {
    try {
      const { q } = ctx.query;
      let filter = { unit: "date", value: 7 };
      if (q === "all") {
        filter.unit = "month";
        filter.value = 12;
      }
      if (q === "1m") {
        filter.unit = "day";
        filter.value = 30;
      }
      if (q === "1w") {
        filter.unit = "day";
        filter.value = 7;
      }
      const account = process.env.MIXPANEL_SERVICE_ACCOUNT;
      const password = process.env.MIXPANEL_SERVICE_PASSWORD;
      const url = `https://mixpanel.com/api/2.0/insights?project_id=2169825&workspace_id=328491`;
      let body = {
        bookmark: {
          sections: {
            show: [
              {
                dataset: "$mixpanel",
                value: {
                  id: 1035953,
                  name: "Monthly Active User",
                  resourceType: "cohorts",
                },
                resourceType: "cohorts",
                profileType: null,
                search: "",
                dataGroupId: null,
                math: "unique",
                perUserAggregation: null,
                property: null,
              },
            ],
            cohorts: [],
            group: [],
            filter: [
              {
                dataset: "$mixpanel",
                value: "$cohorts",
                resourceType: "events",
                profileType: null,
                search: "",
                dataGroupId: null,
                filterType: "list",
                filterOperator: "does not contain",
                filterValue: [
                  {
                    cohort: {
                      id: 1035956,
                      name: "Monthly Active Validator",
                      negated: false,
                    },
                  },
                ],
                propertyObjectKey: null,
              },
            ],
            formula: [],
            time: [
              {
                dateRangeType: "in the last",
                window: filter,
                unit: filter.unit,
              },
            ],
          },
          columnWidths: {
            bar: {},
          },
          displayOptions: {
            chartType: "line",
            plotStyle: "standard",
            analysis: "linear",
            value: "absolute",
          },
          sorting: {
            bar: {
              sortBy: "column",
              colSortAttrs: [
                {
                  sortBy: "value",
                  sortOrder: "desc",
                },
              ],
            },
            line: {
              sortBy: "value",
              sortOrder: "desc",
              valueField: "averageValue",
              colSortAttrs: [
                {
                  sortBy: "value",
                  sortOrder: "desc",
                  valueField: "averageValue",
                },
              ],
            },
            table: {
              sortBy: "column",
              colSortAttrs: [
                {
                  sortBy: "label",
                  sortOrder: "asc",
                },
              ],
            },
            "insights-metric": {
              sortBy: "value",
              sortOrder: "desc",
              valueField: "totalValue",
              colSortAttrs: [
                {
                  sortBy: "value",
                  sortOrder: "desc",
                  valueField: "totalValue",
                },
              ],
            },
            pie: {
              sortBy: "value",
              sortOrder: "desc",
              valueField: "totalValue",
              colSortAttrs: [
                {
                  sortBy: "value",
                  sortOrder: "desc",
                  valueField: "totalValue",
                },
              ],
            },
          },
        },
        queryLimits: {},
        use_query_cache: true,
        tracking_props: {
          is_main_query_for_report: true,
          query_reason: null,
          report_name: "insights",
          bookmark_id: 11264352,
          has_unsaved_changes: true,
        },
      };
      const response = await axios({
        method: "post",
        url,
        headers: {
          Authorization: "Basic " + btoa(account + ":" + password),
        },
        data: body,
      });
      return response.data;
    } catch (e) {
      console.log(`Error:${e}`);
    }
  },
};
