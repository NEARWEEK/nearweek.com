'use strict';

/**
 * edition router.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/editions',
      handler: 'edition.find',
    },
    {
      method: 'GET',
      path: '/editions/:id',
      handler: 'edition.findOne',
    },
    {
      method: 'PUT',
      path: '/editions/:id/like',
      handler: 'edition.like',
    },
  ]
}
