const axios = require("axios");
const moment = require("moment");
const CoinGecko = require("coingecko-api");

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
};
