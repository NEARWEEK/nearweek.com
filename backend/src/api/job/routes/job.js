"use strict";

/**
 * job router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/jobs",
      handler: "job.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/jobs/slug",
      handler: "job.findBySlug",
    },
  ],
};
