const bcrypt = require("bcryptjs");

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    const hash = await bcrypt.hash(data.email, 5);
    event.params.data.hash = hash.replace(/\./g, "");
  },
};
