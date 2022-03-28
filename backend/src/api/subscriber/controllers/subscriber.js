"use strict";

/**
 *  subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const Mailchimp = require("mailchimp-api-v3");

const { token, listId } = strapi.config.get("hook.settings.mailchimp");
const mailchimpService = new Mailchimp(token);

module.exports = createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async subscribe(ctx) {
      let response;
      const { email } = ctx.request.body.data;
      try {
        response = await mailchimpService.request({
          method: "post",
          path: `/lists/${listId}/members`,
          body: {
            email_address: email,
            status: "subscribed",
          },
        });

        return { response };
      } catch (err) {
        return { err };
      }
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
