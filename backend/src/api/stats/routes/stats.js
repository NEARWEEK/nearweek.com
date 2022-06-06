module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/list",
      handler: "stats.list",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/tvl",
      handler: "stats.tvl",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/tvl/aggregate",
      handler: "stats.tvlAggregate",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/active-developers",
      handler: "stats.activeDevelopers",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/dao",
      handler: "stats.dao",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/price",
      handler: "stats.price",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/market-chart",
      handler: "stats.marketChart",
    },
  ],
};
