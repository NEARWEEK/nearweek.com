module.exports = {
  settings: {
    cors: {
      enabled: true, // tried true and false
      headers: "*",
      origin: ["CORS_ORIGIN", "http://localhost:3000", "http://localhost:1337"],
    },
  },
};
