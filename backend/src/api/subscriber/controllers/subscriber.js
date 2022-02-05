"use strict";

/**
 *  subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async subscribe(ctx) {
      let response;
      const { email } = ctx.request.body.data;
      const entity = await strapi.query("api::subscriber.subscriber").findOne({
        where: { email },
      });

      if (!entity) {
        response = await super.create(ctx);
        return response;
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
    async unsubscribe(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.query("api::subscriber.subscriber").findOne({
        where: { hash: id },
        populate: {
          hash: true,
        },
      });

      if (entity) {
        ctx.params.id = entity.id;
        const response = await super.delete(ctx);
        return response;
      }
      ctx.response.status = 404;
      return "not implemented";
    },
  })
);
