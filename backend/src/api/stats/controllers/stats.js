const moment = require("moment"); // require
const CoinGecko = require("coingecko-api");

const CoinGeckoClient = new CoinGecko();

module.exports = {
  async fetch(ctx) {
    try {
      const getPrice = async () => {
        return CoinGeckoClient.coins.fetch("near", {
          localization: false,
          tickers: false,
        });
      };

      const stats = await getPrice();

      return stats.data;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async global() {
    try {
      const stats = await CoinGeckoClient.global();

      return stats.data;
    } catch (e) {
      console.log("Error:", e);
    }
  },
  async price() {
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
