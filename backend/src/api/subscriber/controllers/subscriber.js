"use strict";

/**
 *  subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

const emailTemplate = {
  subject: "NEARWEEK.com subscription",
  text: `Welcome on nearweek.com!
    Thanks for subscribing to the NEARWEEK newsletter.`,
  html: `<h1>Welcome on nearweek.com!</h1>
    <p>Thanks for subscribing to the NEARWEEK newsletter.<p>`,
};

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
        await strapi.plugins["email"].services.email.sendTemplatedEmail(
          {
            to: email,
          },
          emailTemplate,
          {
            user: { email },
          }
        );
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
    async find(ctx) {
      return ctx.response.methodNotAllowed("Method not allowed", [], []);
    },
    async findOne(ctx) {
      return ctx.response.methodNotAllowed("Method not allowed", [], []);
    },
  })
);
