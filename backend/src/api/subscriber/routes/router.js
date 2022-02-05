module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/subscribe",
      handler: "subscriber.subscribe",
      config: {
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/unsubscribe/:id",
      handler: "subscriber.unsubscribe",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
