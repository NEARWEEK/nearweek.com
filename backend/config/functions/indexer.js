const axios = require("axios");

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
    Promise.all([indexEvents(), indexEditions()]);
  } catch (e) {
    console.log("Error", e);
  }
};

module.exports = {
  indexDb: indexDb,
};
