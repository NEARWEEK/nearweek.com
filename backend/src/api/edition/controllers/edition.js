'use strict';

/**
 *  edition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::edition.edition', ({ strapi }) =>  ({

  async like(ctx) {

    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::edition.edition').findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const increaseLikes = Number(sanitizedEntity.likes) + 1;
    await strapi.entityService.update('api::edition.edition', sanitizedEntity.id, {
      data: {
        likes: increaseLikes,
      },
    });

    return this.transformResponse(sanitizedEntity);

  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi.service('api::edition.edition').findOne(id, query);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.views) + 1;

     await strapi.entityService.update('api::edition.edition', sanitizedEntity.id, {
      data: {
        views: increaseView,
      },
    });

    return this.transformResponse(sanitizedEntity);
  }
}));


