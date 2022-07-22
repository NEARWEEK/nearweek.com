"use strict";

const rssFeed = require("../functions/createFeeds");

async function getNewFeedItemsFromAPI() {
  let mapFeeds = [];

  /*  const { results } = await strapi.services["api::article.article"].find({
    populate: "deep",
  });*/

  const entities = await strapi.entityService.findMany("api::article.article", {
    sort: { createdAt: "desc" },
    populate: {
      categories: true,
    },
    start: 0,
    limit: 5,
  });

  for (let article of entities) {
    mapFeeds.push({
      title: article.Title,
      slug: "content/" + article.slug,
      date: article.createdAt,
      content: article.Body,
      category: article.categories.map((category) => category.Name),
    });
  }
  return mapFeeds;
}

async function main() {
  const feedItems = await getNewFeedItemsFromAPI();

  await rssFeed.createRssFeed(feedItems);
}

module.exports = {
  main,
};
