"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { sanitizeEntity } = require("@strapi/utils");
const moment = require("moment");

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async like(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::article.article")
      .findOne(id, query);
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    const increaseLikes = Number(sanitizedEntity.likes) + 1;
    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          likes: increaseLikes,
        },
      }
    );

    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx) {
    const { body } = ctx.request;

    const { data } = JSON.parse(JSON.stringify(body));

    const entity = await strapi.entityService.create("api::article.article", {
      data,
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },

  async findBySlug(ctx, populate) {
    ctx.query = { ...ctx.query, local: "en" };

    const { data, meta } = await super.find(ctx, { populate });

    const entity = await strapi
      .service("api::article.article")
      .findOne(data[0].id, ctx.query);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.Views) + 1;

    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          Views: increaseView,
        },
      }
    );
    return this.transformResponse(sanitizedEntity);
  },

  async find(ctx, populate) {
    // some custom logic here
    ctx.query = { ...ctx.query, local: "en" };

    // Calling the default core action
    const { data, meta } = await super.find(ctx, { populate });

    //console.log("data", data[0].attributes.Images);

    // some more custom logic
    meta.date = Date.now();

    return { data, meta };
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    const { query } = ctx;

    const entity = await strapi
      .service("api::article.article")
      .findOne(id, query);

    const allEditions = await strapi.service("api::article.article").find({});

    const ids = allEditions.results.map((item) => item.id);

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    const increaseView = Number(sanitizedEntity.Views) + 1;

    await strapi.entityService.update(
      "api::article.article",
      sanitizedEntity.id,
      {
        data: {
          Views: increaseView,
        },
      }
    );
    return this.transformResponse(sanitizedEntity, { ids: ids });
  },

  async getWidget() {
    try {
      const widget = `
                      <!doctype html>
                      <html>
                      <head>
                          <title>News widget</title>
                          <meta charset="utf-8">
                          <meta name="viewport" content="width=device-width">
                      </head>
                      <body style="width:100%">
                          <div id="something-else-in-your-website">
                            <div id="nearweek-news" className="nearweek-news-widget"></div>
                          </div>
                          <link
                            href="http://5.161.56.222/js/widgets/news-widget/index.css"
                            rel="stylesheet"
                          />
                          <script src="http://5.161.56.222/js/widgets/news-widget/index.js"></script>
                      </body>
                      </html>
          `;

      return widget;
    } catch (e) {
      return `<div>OOOps! Something went wrong...</div>`;
    }
  },

  async findUnpublished(ctx, populate) {
    const { author } = ctx.request.query;

    const articles = await strapi.entityService.findMany(
      "api::article.article",
      {
        filters: {
          $and: [
            {
              Author: author,
            },
            {
              publishedAt: { $null: true },
            },
          ],
        },
        populate: "*",
      }
    );
    //sanitize them to hide all private fields
    const sanitizedEntity = await this.sanitizeOutput(articles, ctx);

    //return result to the /findPublished API
    return this.transformResponse(sanitizedEntity);
  },

  async findPublished(ctx, populate) {
    const { author } = ctx.request.query;

    let articles = await strapi.entityService.findMany("api::article.article", {
      filters: {
        $and: [
          {
            publishedAt: { $notNull: true },
          },
          {
            Author: author,
          },
        ],
      },
      populate: "*",
    });

    console.log(articles);

    //sanitize them to hide all private fields
    const sanitizedEntity = await this.sanitizeOutput(articles, ctx);

    //return result to the /findPublished API
    return this.transformResponse(sanitizedEntity);
  },
}));
