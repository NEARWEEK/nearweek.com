'use strict';

/**
 * audio service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::audio.audio');
