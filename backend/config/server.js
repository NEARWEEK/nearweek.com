const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("WEBSITE", "http://127.0.0.1:1337/"),
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
  elastic: {
    enabled: false,
    host: env("ELASTIC", "http://127.0.0.1:9200"),
  },
});
