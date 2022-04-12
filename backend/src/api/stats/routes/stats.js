module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats",
      handler: "stats.fetch",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/global",
      handler: "stats.global",
    },
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/stats/price",
      handler: "stats.price",
    },
  ],
};
