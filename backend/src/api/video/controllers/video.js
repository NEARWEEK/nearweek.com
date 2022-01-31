"use strict";

/**
 *  video controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::video.video", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service("api::video.video").findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const increaseLikes = Number(sanitizedEntity.likes) + 1;
    await strapi.entityService.update("api::video.video", sanitizedEntity.id, {
      data: {
        likes: increaseLikes,
      },
    });

    return this.transformResponse(sanitizedEntity);
  },

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

    const entity = await strapi.service("api::video.video").findOne(id, query);

    const allEditions = await strapi.service("api::video.video").find({});

    const ids = allEditions.results.map((item) => item.id);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    console.log("sanitizedEntity", sanitizedEntity);

    const increaseView = Number(sanitizedEntity.Views) + 1;

    await strapi.entityService.update("api::video.video", sanitizedEntity.id, {
      data: {
        Views: increaseView,
      },
    });
    return this.transformResponse(sanitizedEntity, { ids: ids });
  },
}));
