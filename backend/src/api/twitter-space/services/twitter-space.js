'use strict';

/**
 * twitter-space service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::twitter-space.twitter-space');
