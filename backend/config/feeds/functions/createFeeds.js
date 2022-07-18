"use strict";

const fs = require("fs-extra");
const xml = require("xml");
const Cheerio = require("cheerio");

const YOUR_WEBSITE = process.env.BASE_URL;

function buildFeed(posts) {
  const sortedPosts = posts.sort(function (first, second) {
    return new Date(second.date).getTime() - new Date(first.date).getTime();
  });

  const feedItems = [];

  feedItems.push(
    ...sortedPosts.map(function (post) {
      const $ = Cheerio.load(post.content, {
        decodeEntities: false,
      });

      // replace relative links with absolute
      $("a[href^='/'], img[src^='/']").each(function (elem) {
        const $this = $(elem);
        if ($this.attr("href")) {
          $this.attr("href", `${YOUR_WEBSITE}/${$this.attr("href")}`);
        }
        if ($this.attr("src")) {
          $this.attr("src", `${YOUR_WEBSITE}/${$this.attr("src")}`);
        }
      });

      const postContent = $("body").html();

      const feedItem = {
        item: [
          { title: post.title },
          {
            pubDate: new Date(post.date).toUTCString(),
          },
          {
            guid: [
              { _attr: { isPermaLink: true } },
              `${YOUR_WEBSITE}/${post.slug}/`,
            ],
          },
          { image: post.image ? [{ url: post.image }] : null },
          {
            description: {
              _cdata: postContent,
            },
          },
        ],
      };

      return feedItem;
    })
  );

  return feedItems;
}

async function createRssFeed(posts) {
  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                href: `${YOUR_WEBSITE}/feed.rss`,
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title:
              "NEARWEEK.com - Your weekly dose of news from the NEARverse!",
          },
          {
            link: `${YOUR_WEBSITE}/`,
          },
          { description: "YOUR-WEBSITE-DESCRIPTION" },
          { language: "en-US" },
          ...buildFeed(posts),
        ],
      },
    ],
  };

  const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
  const rootDir = process.cwd();

  await fs.writeFile(rootDir + "/public/feed.rss", feed);
}

module.exports = {
  createRssFeed,
};
