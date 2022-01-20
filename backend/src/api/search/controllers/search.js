const axios = require("axios");

module.exports = {
  async fetch(ctx) {
    try {
      let { q } = ctx.query;
      const HOST = strapi.config.get("server.elastic.host");
      const url = `${HOST}/_search?pretty&sort=createdAt:desc&q=${q}`;
      const searchResults = await axios.get(url);
      return searchResults.data || {};
    } catch (e) {
      console.log("Error:", e);
    }
  },
};
