const slugify = require("slugify");

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      console.log(data);
      if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }
    },
    async beforeUpdate(params, data) {
      console.log(data);
      if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }
    },
  },
};
