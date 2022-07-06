"use strict";

/**
 * edition router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/editions",
      handler: "edition.find",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/editions/slug",
      handler: "edition.findBySlug",
    },
    {
      method: "GET",
      path: "/editions/:id",
      handler: "edition.findOne",
    },
    {
      method: "PUT",
      path: "/editions/:id/like",
      handler: "edition.like",
    },
  ],
};
