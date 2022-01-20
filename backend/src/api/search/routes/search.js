module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/search",
      handler: "search.fetch",
    },
  ],
};
