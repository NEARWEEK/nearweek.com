"use strict";

/**
 *  video controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::video-tag.video-tag",
  ({ strapi }) => ({
    async find(ctx, populate) {
      // some custom logic here
      ctx.query = { ...ctx.query, local: "en" };

      // Calling the default core action
      const { data, meta } = await super.find(ctx, { populate });

      // some more custom logic
      meta.date = Date.now();

      return { data, meta };
    },

    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;

      const entity = await strapi
        .service("api::video-tag.video-tag")
        .findOne(id, query);

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
