const indexer = require("./functions/indexer");

module.exports = {
  "10 * * * * *": async ({ strapi }) => {
    const subscribers = await strapi
      .service("api::subscriber.subscriber")
      .find();
    for (const subscriber of subscribers.results) {
      /* await strapi.plugins['email'].services.email.send({
        to: subscriber.email,
        from: 'no-reply@strapi.io',
        cc: 'no-reply@strapi.io',
        bcc: 'no-reply@strapi.io',
        replyTo: 'no-reply@strapi.io',
        subject: 'Use strapi email provider successfully',
        text: 'Hello world!',
        html: 'Hello world!',
      });*/
    }
  },
  "10 * * * * *": async ({ strapi }) => {
    try {
      const elastic = strapi.config.get("server.elastic");
      if (elastic && elastic.enabled) {
        indexer.indexDb();
      }
    } catch (e) {
      console.log("Error", e);
    }
  },
};
