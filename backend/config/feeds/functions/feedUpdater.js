"use strict";

const rssFeed = require("../functions/createFeeds");

async function getNewFeedItemsFromAPI() {
  let mapFeeds = [];
  const { results } = await strapi.services["api::article.article"].find({
    populate: "deep",
  });
  for (let article of results) {
    mapFeeds.push({
      title: article.Title,
      slug: "content/" + article.slug,
      date: article.createdAt,
      image: article.Thumbnail?.url || null,
      content: article.Body,
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
