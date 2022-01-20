const axios = require("axios");

const indexNews = async () => {
  try {
    console.log("Run index News");
    const HOST = strapi.config.get("server.elastic.host");
    const news = await strapi
      .service("api::article.article")
      .find({ populate: "*" });
    if (news.results) {
      for (const article of news.results) {
        await axios.put(`${HOST}/news/article/${article.id}?pretty`, article);
      }
    }
  } catch (e) {
    console.log("Error:", e);
  }
};

const indexEvents = async () => {
  try {
    console.log("Run index Events");
    const HOST = strapi.config.get("server.elastic.host");
    const events = await strapi
      .service("api::event.event")
      .find({ populate: "*" });
    if (events.results) {
      for (const event of events.results) {
        await axios.put(`${HOST}/events/event/${event.id}?pretty`, event);
      }
    }
  } catch (e) {
    console.log("Error:", e);
  }
};

const indexEditions = async () => {
  try {
    console.log("Run index Editions");
    const HOST = strapi.config.get("server.elastic.host");
    const editions = await strapi
      .service("api::edition.edition")
      .find({ populate: "*" });
    if (editions.results) {
      for (const edition of editions.results) {
        await axios.put(
          `${HOST}/editions/edition/${edition.id}?pretty`,
          edition
        );
      }
    }
  } catch (e) {
    console.log("Error:", e);
  }
};

const indexDb = () => {
  try {
    Promise.all([indexEvents(), indexEditions(), indexNews()]);
  } catch (e) {
    console.log("Error", e);
  }
};

module.exports = {
  indexDb: indexDb,
};
