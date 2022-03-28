const slugify = require("slugify");

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.Title && data.Number) {
      data.slug = slugify(`${data.Title} ${data.Number}`, { lower: true });
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    console.log(data);
    if (data.Title && data.Number) {
      data.slug = slugify(`${data.Title} ${data.Number}`, { lower: true });
    }
  },
};
