"use strict";

/**
 *  edition controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::edition.edition", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::edition.edition")
      .findOne(id, query);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const increaseLikes = Number(sanitizedEntity.likes) + 1;
    await strapi.entityService.update(
      "api::edition.edition",
      sanitizedEntity.id,
      {
        data: {
          likes: increaseLikes,
        },
      }
    );

    return this.transformResponse(sanitizedEntity);
  },

  async findBySlug(ctx, populate) {
    ctx.query = { ...ctx.query, local: "en" };

    const { data, meta } = await super.find(ctx, { populate });

    const entity = await strapi
      .service("api::edition.edition")
      .findOne(data[0].id, ctx.query);

    //meta.date = new Date();

    const allEditions = await strapi.service("api::edition.edition").find({});

    const curr = allEditions.results[allEditions.results.length - 1].slug;
    const currIndex = allEditions.results.findIndex((item) => {
      return item.slug === data[0].attributes.slug;
    });
    const prev = allEditions.results[currIndex - 1]?.slug;
    const next = allEditions.results[currIndex + 1]?.slug;

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.views) + 1;

    await strapi.entityService.update(
      "api::edition.edition",
      sanitizedEntity.id,
      {
        data: {
          views: increaseView,
        },
        meta,
      }
    );
    return this.transformResponse(sanitizedEntity, { curr, prev, next });
  },

  async find(ctx, populate) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx, { populate });

    //console.log("data", data[0].attributes.Images);

    // some more custom logic
    meta.date = Date.now();

    /*    data.Content = data.Content.replace(
      'src="/',
      `src=\\"${strapi.config.get("server.url")}/`
    );*/

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::edition.edition")
      .findOne(id, query);

    const allEditions = await strapi.service("api::edition.edition").find({});

    const ids = allEditions.results.map((item) => item.id);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.views) + 1;

    await strapi.entityService.update(
      "api::edition.edition",
      sanitizedEntity.id,
      {
        data: {
          views: increaseView,
        },
      }
    );
    return this.transformResponse(sanitizedEntity, { ids: ids });
  },
}));
