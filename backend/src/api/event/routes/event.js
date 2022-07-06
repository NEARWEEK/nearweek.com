"use strict";

/**
 * event router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/events",
      handler: "event.find",
      config: {
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/events/slug",
      handler: "event.findBySlug",
    },
    {
      method: "GET",
      path: "/events/:id",
      handler: "event.findOne",
    },
    {
      method: "PUT",
      path: "/events/:id/like",
      handler: "event.like",
    },
  ],
};
