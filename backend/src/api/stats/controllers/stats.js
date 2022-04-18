const moment = require("moment"); // require
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
        getPrice("ref-finance"),
        getPrice("aurora-near"),
        getPrice("trisolaris"),
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
};
