module.exports = {
  routes: [
    {
      method: "GET",
      path: "/share/widgets/news-widget",
      handler: "widgets.getNewsWidget",
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
      method: "GET",
      path: "/share/widgets/chart-widget",
      handler: "widgets.getChartWidget",
      config: {
        policies: [],
        contentSecurityPolicy: {
          directives: {
            "connect-src": ["'self'"],
          },
        },
        middlewares: [
          async (ctx, next) => {
            await next();
            ctx.set(
              "Content-Security-Policy",
              ctx.response.header["content-security-policy"]
                .replace(/frame-ancestors 'self';/g, "")
                .replace(/connect-src 'self' https:;/g, "")
                .replace(/default-src 'self';/g, "")
            );
          },
        ],
        auth: false,
      },
    },
  ],
};
