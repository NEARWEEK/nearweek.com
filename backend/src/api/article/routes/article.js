"use strict";

/**
 * article router.
 */

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/news",
      handler: "article.find",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/show-news",
      handler: "article.find",
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: "GET",
      path: "/news/slug",
      handler: "article.findBySlug",
    },
    {
      method: "GET",
      path: "/news/:id",
      handler: "article.findOne",
    },
    {
      method: "POST",
      path: "/article",
      handler: "article.create",
      config: {
        policies: ["global::is-nearUser"],
      },
    },
    {
      method: "GET",
      path: "/findUnpublished",
      handler: "article.findUnpublished",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/findPublished",
      handler: "article.findPublished",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/share/widgets/news-widget",
      handler: "article.getWidget",
      config: {
        policies: [],
        middlewares: [
          async (ctx, next) => {
            await next();
            ctx.set(
              "Content-Security-Policy",
              ctx.response.header["content-security-policy"].replace(
                /frame-ancestors 'self';/g,
                ""
              )
            );
          },
        ],
        auth: false,
      },
    },
    {
      method: "PUT",
      path: "/news/:id/like",
      handler: "article.like",
    },
  ],
};
