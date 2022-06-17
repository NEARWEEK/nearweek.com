'use strict';

/**
 *  vote controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vote.vote');
