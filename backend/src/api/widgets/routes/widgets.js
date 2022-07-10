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
  ],
};
