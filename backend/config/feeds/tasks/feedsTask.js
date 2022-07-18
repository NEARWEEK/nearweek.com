"use strict";
const feedUpdater = require("../functions/feedUpdater");

async function updateFeed() {
  return await feedUpdater.main();
}

module.exports = {
  updateFeed,
};
