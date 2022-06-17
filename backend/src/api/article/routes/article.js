"use strict";

/**
 * article router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/news",
      handler: "article.find",
    },
    {
      method: "GET",
      path: "/news/slug",
      handler: "article.findBySlug",
    },
    {
      method: "GET",
      path: "/news/:id",
      handler: "article.findOne",
    },
    {
      method: "POST",
      path: "/article",
      handler: "article.create",
      config: {
        policies: ["global::is-nearUser"],
      },
    },
    {
      method: "GET",
      path: "/findUnpublished",
      handler: "article.findUnpublished",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/findPublished",
      handler: "article.findPublished",
      config: {
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/news/:id/like",
      handler: "article.like",
    },
  ],
};
