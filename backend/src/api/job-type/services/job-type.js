'use strict';

/**
 * job-type service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-type.job-type');
